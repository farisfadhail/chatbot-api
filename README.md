# 📘 Dokumentasi API - Chatbot RAG Endpoint

## 🔹 1. `POST /api/chat`

Mengirim pesan ke chatbot yang didukung oleh Retrieval-Augmented Generation (RAG) dengan dukungan konteks historis dan autentikasi pengguna.

---

### 🔐 Autentikasi

Endpoint ini **wajib** menggunakan autentikasi JWT melalui middleware `authenticate`.  
Sertakan token pada header sebagai berikut:

```
Authorization: Bearer <your_jwt_token>
```

---

### 🔸 Request Body (JSON)

| Field   | Tipe   | Wajib | Keterangan                      |
|---------|--------|-------|---------------------------------|
| message | string | ✅    | Pesan atau pertanyaan dari user |

#### Contoh:
```json
{
  "message": "Apa manfaat blockchain dalam sistem voting?"
}
```

---

### 🔸 Response (JSON)

| Field   | Tipe       | Keterangan                                             |
|---------|------------|--------------------------------------------------------|
| answer  | string     | Jawaban dari chatbot berbasis konteks dokumen         |
| context | string[]   | Daftar nama dokumen yang digunakan sebagai referensi  |

#### Contoh:
```json
{
  "answer": "Blockchain memberikan transparansi dan keamanan dalam sistem voting...",
  "context": ["blockchain.txt"]
}
```

---

### ⚠️ Error Response

| Kode | Kasus                          | Contoh Response                                 |
|------|--------------------------------|-------------------------------------------------|
| 400  | Field `message` kosong         | `{ "error": "Message is required" }`           |
| 500  | Gagal memanggil RAG endpoint   | `{ "error": "Failed to get response from RAG API" }` |

---

### 🧠 Konteks Historis

- Chatbot mempertahankan konteks berdasarkan `userId` dari token autentikasi.
- Riwayat percakapan sebelumnya ditambahkan ke prompt untuk menghasilkan jawaban yang lebih kontekstual.
---

## 🔹 2. `POST /login`

Melakukan login sederhana dan mendapatkan JWT untuk autentikasi ke endpoint lain.

---

### 🔸 Request Body (JSON)

| Field    | Tipe   | Wajib | Keterangan                       |
|----------|--------|-------|----------------------------------|
| username | string | ✅    | Nama pengguna (fake login)       |

#### Contoh:
```json
{
  "username": "user123"
}
```

---

### 🔸 Response (JSON)

| Field | Tipe   | Keterangan                       |
|-------|--------|----------------------------------|
| token | string | Token JWT untuk autentikasi API  |

#### Contoh:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### ⚠️ Error Response

| Kode | Kasus                    | Contoh Response                      |
|------|--------------------------|--------------------------------------|
| 400  | Field `username` kosong  | `{ "error": "Username required" }`  |
