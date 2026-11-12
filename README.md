# Ứng dụng dạy học Toán – Thầy Vũ Tiến Lực (web app)

Thư mục này là web app hoàn chỉnh: cài được như ứng dụng (Chrome/Edge: nút ⤓ "Cài ứng dụng" ở thanh bên, hoặc biểu tượng cài trên thanh địa chỉ;
iPad/iPhone: Safari → Chia sẻ → Thêm vào MH chính) và chạy được khi mất mạng sau lần mở đầu tiên.

## Đưa lên Vercel
1. Tạo repo GitHub mới (ví dụ `day-hoc-toan`), tải toàn bộ các file trong thư mục này lên.
2. Vào vercel.com → Add New → Project → chọn repo → Deploy (không cần cấu hình gì thêm).
3. Ví dụ địa chỉ: https://day-hoc-toan.vercel.app

Hoặc dùng Vercel CLI trong thư mục này: `npx vercel --prod`.

## Cập nhật
Khi sửa `index.html`, đổi `CACHE = "day-hoc-toan-v1"` trong `sw.js` thành v2, v3… để máy học sinh/giáo viên tải bản mới.
