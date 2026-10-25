# SmartKey Teacher Academy – Landing page

Landing page giới thiệu chương trình **đào tạo giáo viên Tiền Tiểu Học** theo phương pháp SmartKey và nhận đăng ký tư vấn.
Toàn bộ trang nằm trong một file `index.html`, không cần cài đặt hay build.

- Trang online: https://lequyducmanh.github.io/smartkey-teacher-academy/
- GitHub Pages phát từ nhánh `gh-pages` (cập nhật cả `main` và `gh-pages` khi sửa trang).

## Kết nối form đăng ký với Google Sheet

Mỗi lượt đăng ký thành công sẽ được ghi thành một dòng trong Google Sheet:
`Thời gian | Họ và tên | Số điện thoại / Zalo | Công việc / kinh nghiệm | Mục tiêu tham gia | Trang nguồn | Trạng thái`.
Cột **Trang nguồn** lưu cả tham số UTM, giúp biết khách đến từ chiến dịch nào.

### Bước 1 – Tạo Sheet và dán script (khoảng 3 phút)

1. Tạo một Google Sheet mới (ví dụ: *SmartKey – Đăng ký đào tạo GV*).
2. Trong Sheet: **Tiện ích mở rộng → Apps Script**.
3. Xoá hết code mặc định, dán toàn bộ nội dung file [`google-apps-script/Code.gs`](google-apps-script/Code.gs), bấm **Lưu**.
4. Bấm **Triển khai → Tùy chọn triển khai mới**:
   - Bấm biểu tượng bánh răng → chọn **Ứng dụng web**
   - *Thực thi dưới dạng*: **Tôi**
   - *Người có quyền truy cập*: **Bất kỳ ai**
   - Bấm **Triển khai** → **Cấp quyền truy cập** → chọn tài khoản Google
     (nếu hiện “Google chưa xác minh ứng dụng này”: **Nâng cao → Đi tới … (không an toàn)** → **Cho phép**; đây là script của chính bạn).
5. Sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).

Kiểm tra nhanh: mở URL đó trên trình duyệt, nếu thấy `{"result":"ok", ...}` là script đã chạy.

### Bước 2 – Dán URL vào trang

Mở `index.html`, tìm dòng:

```js
var SHEET_ENDPOINT = '';
```

dán URL vào giữa hai dấu nháy, rồi lưu/commit (trên GitHub: mở file → biểu tượng bút chì → sửa → **Commit changes**, làm cho cả nhánh `gh-pages`).

> Khi `SHEET_ENDPOINT` còn trống, form sẽ báo “Biểu mẫu đang được kết nối hệ thống” và **không** giả vờ gửi thành công.

### Lưu ý

- Nếu sau này sửa `Code.gs`, phải **Triển khai → Quản lý triển khai → Chỉnh sửa → Phiên bản mới** thì thay đổi mới có hiệu lực (URL giữ nguyên).
- Form có kiểm tra số điện thoại (10–11 số, bắt đầu bằng 0 hoặc +84), bẫy chống spam và chặn chèn công thức vào Sheet.
- Nếu trang có cài Google Analytics (`gtag`) hoặc Meta Pixel (`fbq`), mỗi lượt đăng ký thành công sẽ tự gửi sự kiện `generate_lead` / `Lead`.

## Cần bổ sung trước khi chạy chính thức

Tìm các đoạn trong ngoặc vuông trong `index.html` và thay bằng nội dung thật:

- `[ẢNH CÔ PHƯỢNG]` – ảnh chân dung người hướng dẫn.
- `[VIDEO THỰC TẾ]` (3 video) – cô Phượng hướng dẫn trẻ nhận diện chữ, đánh vần; luyện viết; phân tích tình huống trẻ học chậm.
- `[Hình ảnh]`, `[Phản hồi]` – bài làm của trẻ và phản hồi của giáo viên đã tham gia đào tạo.
- `[SỐ ĐIỆN THOẠI]`, `[ĐỊA CHỈ EMAIL]`, `[ĐỊA CHỈ CƠ SỞ]` – thông tin liên hệ ở chân trang.

Chỉ sử dụng tư liệu thật và được phép công bố; thông tin về kinh nghiệm, thành tích và kết quả đào tạo cần được xác minh trước khi đăng.
