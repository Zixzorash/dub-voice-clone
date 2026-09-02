// Register PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => console.log('PWA Registered'));
}

const fileInput = document.getElementById('mediaFile');
const fileNameDisplay = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const statusDisplay = document.getElementById('status');
const downloadBtn = document.getElementById('downloadBtn');

let selectedFile = null;

fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        fileNameDisplay.textContent = `ไฟล์ที่เลือก: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`;
        processBtn.disabled = false;
    }
});

processBtn.addEventListener('click', async () => {
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const originalExtension = selectedFile.name.split('.').pop(); // ดึงนามสกุลไฟล์ต้นฉบับ

    statusDisplay.textContent = 'กำลังอัปโหลดและประมวลผล (Diarization & Voice Cloning)...';
    processBtn.disabled = true;

    try {
        // ใช้ FormData จำลองการส่งข้อมูลไปยัง AI Backend 
        // (ระบบ Voice Clone จริงจำเป็นต้องใช้ GPU Backend เช่น XTTSv2 หรือ VITS)
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('sourceLang', sourceLang);
        formData.append('targetLang', targetLang);
        formData.append('outputFormat', originalExtension);

        /* 
        ตัวอย่างการเชื่อมต่อ API ของคุณผ่าน Wi-Fi 7 (ความเร็วสูง)
        const response = await fetch('https://your-ai-backend.com/api/clone-dub', {
            method: 'POST',
            body: formData
        });
        const blob = await response.blob(); 
        */

        // จำลองการโหลดประมวลผล 3 วินาทีสำหรับ UI สาธิต
        await new Promise(r => setTimeout(r, 3000));
        
        // จำลองไฟล์ผลลัพธ์ (ในการใช้งานจริง เปลี่ยนเป็น blob ที่ได้จาก API)
        const mockResultBlob = new Blob(["mock-audio-video-data"], { type: selectedFile.type });
        const resultUrl = URL.createObjectURL(mockResultBlob);

        statusDisplay.textContent = 'เสร็จสิ้น! วิเคราะห์ผู้พูดและโคลนเสียงเรียบร้อย';
        
        downloadBtn.href = resultUrl;
        downloadBtn.download = `dubbed_${targetLang}_${selectedFile.name}`;
        downloadBtn.hidden = false;

    } catch (error) {
        statusDisplay.textContent = 'เกิดข้อผิดพลาดในการประมวลผล';
        statusDisplay.style.color = 'red';
    } finally {
        processBtn.disabled = false;
    }
});