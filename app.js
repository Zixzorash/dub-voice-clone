// Register PWA Service Worker สำหรับให้ติดตั้งแอปบนหน้าจอโฮมได้
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('PWA Service Worker Registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

// ผูกตัวแปรกับ Element ใน index.html
const fileInput = document.getElementById('mediaFile');
const fileNameDisplay = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const statusDisplay = document.getElementById('status');
const downloadBtn = document.getElementById('downloadBtn');

let selectedFile = null;

// จัดการเมื่อผู้ใช้เลือกไฟล์
fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        // แสดงชื่อไฟล์และขนาด (MB)
        const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        fileNameDisplay.textContent = `ไฟล์ที่เลือก: ${selectedFile.name} (${fileSizeMB} MB)`;
        
        // เปิดให้กดปุ่มดำเนินการได้ ซ่อนปุ่มดาวน์โหลดเก่า(ถ้ามี)
        processBtn.disabled = false;
        downloadBtn.hidden = true;
        statusDisplay.textContent = '';
    }
});

// จัดการเมื่อกดปุ่ม "เริ่มพากย์เสียงและโคลน (AI)"
processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    // อัปเดต UI เพื่อแสดงสถานะโหลด
    statusDisplay.textContent = 'กำลังส่งไฟล์ไปที่ AI Backend... (กระบวนการนี้อาจใช้เวลาสักครู่)';
    statusDisplay.style.color = '#00E5FF';
    processBtn.disabled = true;
    downloadBtn.hidden = true;

    try {
        // 1. นำเข้า Gradio Client แบบ Dynamic Import 
        const { client } = await import("https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js");
        
        // 2. เชื่อมต่อไปยัง Hugging Face Space ของคุณ (zixzorash/dub-voice-backend)
        const app = await client("zixzorash/dub-voice-backend");
        
        statusDisplay.textContent = 'AI กำลังทำการถอดเสียง แปลภาษา และโคลนเสียง...';

        // 3. เรียกใช้งาน API ตาม Endpoint ของฟังก์ชัน Python
        const result = await app.predict("/process_dubbing", [
            selectedFile, 
            sourceLang, 
            targetLang
        ]);

        let resultFileUrl = "";
        const outputData = result.data[0];
        
        if (typeof outputData === 'object' && outputData !== null) {
            resultFileUrl = outputData.url || outputData.path;
        } else {
            resultFileUrl = outputData;
        }

        const statusMessage = result.data[1] || "ประมวลผลสำเร็จ";

        // ตรวจสอบความถูกต้องของลิงก์ไฟล์ (ป้องกันการดาวน์โหลดหน้า HTML Error ติดมา)
        if (!resultFileUrl || resultFileUrl.endsWith('.html')) {
            throw new Error(statusMessage.includes("Error") ? statusMessage : "เซิร์ฟเวอร์ AI ส่งไฟล์ผลลัพธ์ไม่ถูกต้อง");
        }

        // 5. อัปเดต UI เมื่อสำเร็จ
        statusDisplay.textContent = statusMessage;
        statusDisplay.style.color = '#00FF00'; // สีเขียว
        
        downloadBtn.href = resultFileUrl;
        downloadBtn.download = `dubbed_${targetLang}_${selectedFile.name}`;
        downloadBtn.hidden = false;

    } catch (error) {
        console.error(error);
        statusDisplay.textContent = 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ AI: ' + (error.message || 'เชื่อมต่อล้มเหลว');
        statusDisplay.style.color = 'red';
    } finally {
        processBtn.disabled = false;
    }
});
