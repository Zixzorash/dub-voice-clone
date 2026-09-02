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
        
        statusDisplay.textContent = 'AI กำลังทำการถอดเสียง แยกผู้พูด และโคลนเสียง...';

        // 3. เรียกใช้งาน API (ส่งไฟล์, ภาษาต้นฉบับ, ภาษาเป้าหมาย)
        const result = await app.predict("/process_dubbing", [
            selectedFile, 
            sourceLang, 
            targetLang
        ]);

        // 4. ดึง URL ของไฟล์ผลลัพธ์ที่ฝั่ง Server ส่งกลับมา
        const resultFileUrl = result.data[0].url;

        // 5. อัปเดต UI เมื่อสำเร็จ
        statusDisplay.textContent = 'สำเร็จ! ประมวลผลและโคลนเสียงเรียบร้อย';
        statusDisplay.style.color = '#00FF00'; // สีเขียว
        
        downloadBtn.href = resultFileUrl;
        downloadBtn.download = `dubbed_${targetLang}_${selectedFile.name}`;
        downloadBtn.hidden = false;

    } catch (error) {
        // จัดการเมื่อเกิดข้อผิดพลาด
        console.error(error);
        statusDisplay.textContent = 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ AI: ' + (error.message || 'เชื่อมต่อล้มเหลว');
        statusDisplay.style.color = 'red';
    } finally {
        // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้คืนสถานะปุ่มกลับมา
        processBtn.disabled = false;
    }
});
