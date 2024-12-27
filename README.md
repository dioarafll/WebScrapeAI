

# **Web Scraping Summarization with Vite React TypeScript and Spring Boot**  

Proyek ini mencakup aplikasi **frontend** berbasis Vite React TypeScript dan **backend** berbasis Spring Boot. Tujuannya adalah untuk melakukan scraping konten dari halaman web, meringkas teks menggunakan model summarization dari **Hugging Face**, dan menyajikan hasilnya di UI yang interaktif.  

---  

## Fitur Utama  

### Backend  
1. **Scraping Konten Web:** Menggunakan **Jsoup** untuk mengambil konten dari halaman web.  
2. **Summarization Model:** Menggunakan **Hugging Face** untuk meringkas teks hasil scraping.  
3. **API RESTful:** Endpoint untuk scraping dan summarization dengan dokumentasi interaktif melalui **OpenAPI**.  
4. **Dukungan CORS:** Backend dapat diakses lintas domain oleh frontend.  

### Frontend  
1. **Input URL:** Form untuk memasukkan URL halaman yang ingin di-scrape.  
2. **Hasil Scraping:** Menampilkan konten asli dan konten yang diringkas dalam antarmuka yang ramah pengguna.  
3. **Integrasi API:** Menggunakan **Axios** untuk memanggil API backend.  
4. **Deployment:** Aplikasi frontend di-deploy di **Netlify**.  

---  

## Teknologi yang Digunakan  

### Backend  
- **Spring Boot:** Untuk API RESTful.  
- **Jsoup:** Untuk scraping konten web.  
- **Hugging Face Model Library:** Untuk summarization teks.  
- **OpenAPI:** Untuk dokumentasi API interaktif.  

### Frontend  
- **Vite React TypeScript:** Untuk pengembangan UI yang modern dan cepat.  
- **Axios:** Untuk integrasi API.  
- **Netlify:** Untuk deployment frontend.  

---  

## Langkah Instalasi  

### Backend  

1. **Clone repository backend:**  
   ```bash  
   git clone
   cd backend
   ```  

2. **Jalankan aplikasi Spring Boot:**  
   - Tambahkan dependensi di file `pom.xml`.  
   - Jalankan dengan:  
     ```bash  
     mvn spring-boot:run  
     ```  

3. **Akses dokumentasi OpenAPI:**  
   - Kunjungi `http://localhost:8080/swagger-ui.html`.  

---

### Frontend  

1. **Clone repository frontend:**  
   ```bash  
   git clone   
   cd frontend
   ```  

2. **Instal dependensi:**  
   ```bash  
   npm install  
   ```  

3. **Konfigurasi environment:**  
   - Buat file `.env` dan tambahkan:  
     ```env  
     VITE_BACKEND_URL=http://localhost:8080/
     ```  

4. **Jalankan aplikasi:**  
   ```bash  
   npm run dev  
   ```  

5. **Deploy ke Netlify:**  
   - Build aplikasi:  
     ```bash  
     npm run build  
     ```  
   - Upload folder `dist` ke **Netlify**.  

---

## Alur Kerja  

1. Pengguna memasukkan URL di frontend.  
2. Frontend mengirim permintaan `POST` ke endpoint backend `/api/scrape`.  
3. Backend melakukan scraping konten menggunakan **Jsoup**.  
4. Konten diolah dengan summarization menggunakan **Hugging Face**, lalu dikirim kembali ke frontend.  
5. Frontend menampilkan konten asli dan hasil summarization kepada pengguna.  

---

## Tautan Eksternal  

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)  
- [Jsoup Documentation](https://jsoup.org/)  
- [Hugging Face Summarization Models](https://huggingface.co/models?pipeline_tag=summarization)  
- [OpenAPI Documentation](https://swagger.io/specification/)  
- [Vite Documentation](https://vitejs.dev/)  
- [Netlify Deployment Guide](https://docs.netlify.com/site-deploys/overview/)  

---

## Demo  

Frontend aplikasi di-deploy di **Netlify**: [Akses Demo di Sini](https://glittering-pegasus-500536.netlify.app/).  

---  

## Lisensi  

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).
