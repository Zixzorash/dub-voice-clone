# 🎙️ DUB&Voice Clone By IDOL_CHAMP

![PWA](https://img.shields.io/badge/PWA-Ready-success) ![Cloudflare Pages](https://img.shields.io/badge/Hosted_on-Cloudflare_Pages-orange) ![Android 16](https://img.shields.io/badge/Optimized_for-Android_16-green)

WebApp สำหรับพากย์เสียงวิดีโอและเสียงร้องจากภาษาต้นฉบับเป็นภาษาที่ต้องการ พร้อมฟีเจอร์ **Voice Cloning** ที่สามารถคงลักษณะเสียง โทนเสียง แยกบุคคล และแยกเพศของต้นฉบับได้อย่างสมจริง 

ออกแบบมาในรูปแบบ Progressive Web App (PWA) เพื่อดึงประสิทธิภาพสูงสุดของ Hardware สมาร์ทโฟนระดับเรือธง (เช่น Xiaomi 13 Pro, RAM 12GB, Wi-Fi 7) โดยผสานการทำงานกับ WebAssembly (FFmpeg.wasm) และ AI Backend อย่างทรงพลัง

---

## ✨ ฟีเจอร์หลัก (Key Features)

- **AI Voice Cloning & Speaker Diarization:** แยกแยะผู้พูด เพศ และสร้างเสียงพากย์ที่คงเอกลักษณ์ของเสียงต้นฉบับไว้ในภาษาเป้าหมาย
- **รองรับไฟล์สื่อหลากหลาย:** นำเข้าไฟล์ `.mp4`, `.mp3`, `.m4a`, และ `.wav`
- **รูปแบบไฟล์ผลลัพธ์:** ส่งออกไฟล์เป็นนามสกุลเดียวกับไฟล์ต้นฉบับ (คงคุณสมบัติไฟล์ต้นทางไว้)
- **ภาษาที่รองรับ (Source & Target):** 
  - 🇹🇭 ไทย (Thai)
  - 🇯🇵 ญี่ปุ่น (Japanese)
  - 🇺🇸 อังกฤษ (English)
  - 🇨🇳 จีน (Chinese)
  - 🇰🇷 เกาหลี (Korean)
  - 🇷🇺 รัสเซีย (Russian)
- **PWA Ready:** ติดตั้งเป็นแอปพลิเคชัน Standalone บนหน้าจอโฮมของ Android ได้โดยตรง ทำงานลื่นไหลแบบ Native App

---

## 📱 ความต้องการของระบบ (System Requirements)

แอปพลิเคชันนี้ถูกปรับแต่งมาให้ทำงานได้อย่างเต็มประสิทธิภาพสูงสุดบนอุปกรณ์:
- **OS:** Android 16 (HyperOS 3.1 Global หรือเทียบเท่า)
- **RAM:** 12 GB ขึ้นไป (เพื่อประสิทธิภาพในการจัดการ Buffer ไฟล์วิดีโอหรือ Audio ขนาดใหญ่บนเบราว์เซอร์ได้อย่างเสถียร)
- **Network:** Wi-Fi 7 (สำหรับการส่งรับข้อมูลไฟล์สื่อไปประมวลผลบน AI Server แบบ Ultra-low latency)
- **Browser:** Google Chrome (เวอร์ชันล่าสุดที่รองรับ Web Workers และ WebAssembly)

---

## 🚀 วิธีการติดตั้ง (Installation)

เนื่องจากระบบถูกสร้างเป็น Progressive Web App (PWA) คุณสามารถติดตั้งลงสมาร์ทโฟนได้ง่ายๆ โดยไม่ต้องผ่าน Store:

1. เปิดเบราว์เซอร์ **Google Chrome** บนเครื่อง
2. เข้าไปที่ URL ของเว็บแอป (เช่น `https://dub-voice-clone.pages.dev`)
3. แตะที่เมนู **3 จุด (มุมขวาบน)**
4. เลือก **"Add to Home screen" (เพิ่มลงในหน้าจอหลัก)**
5. กด **Install** โลโก้แอป DUB&Voice จะปรากฏที่หน้าจอโฮมของคุณ

---

## 📖 วิธีการใช้งาน (How to Use)

1. เปิดแอป **DUB&Voice** จากหน้าจอโฮม
2. กดปุ่ม **"เลือกไฟล์"** เพื่ออัปโหลดไฟล์วิดีโอหรือไฟล์เสียง
3. ในหมวด **ภาษาต้นฉบับ** ให้เลือกภาษาดั้งเดิมของไฟล์สื่อ
4. ในหมวด **ภาษาที่ต้องการแปล** ให้เลือกภาษาปลายทางที่ต้องการให้ AI พากย์เสียง
5. กดปุ่ม **"เริ่มพากย์เสียงและโคลน (AI)"**
6. รอระบบประมวลผล (ระยะเวลาขึ้นอยู่กับขนาดไฟล์และความเร็วอินเทอร์เน็ตในการประมวลผลบนเซิร์ฟเวอร์)
7. เมื่อเสร็จสิ้น กดปุ่ม **"ดาวน์โหลดไฟล์ผลลัพธ์"** เพื่อบันทึกไฟล์สกุลเดียวกับต้นฉบับลงเครื่อง

---

## 🛠️ โครงสร้างการพัฒนา (Tech Stack)

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Local Media Processing:** FFmpeg.wasm
- **Hosting & CI/CD:** Cloudflare Pages
- **Version Control:** GitHub

---
*Developed by IDOL_CHAMP*
