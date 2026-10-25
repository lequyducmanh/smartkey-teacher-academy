/**
 * SmartKey Teacher Academy – nhận đăng ký tư vấn từ landing page và ghi vào Google Sheet.
 *
 * Cách dùng (chi tiết trong README.md):
 *  1. Mở Google Sheet sẽ dùng để nhận đăng ký → Tiện ích mở rộng → Apps Script.
 *  2. Xoá hết code mặc định, dán toàn bộ file này vào, bấm Lưu.
 *  3. Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *     - Thực thi dưới dạng: Tôi
 *     - Người có quyền truy cập: Bất kỳ ai
 *  4. Sao chép URL ứng dụng web (kết thúc bằng /exec) và dán vào SHEET_ENDPOINT trong index.html.
 */

var SHEET_NAME = 'Đăng ký tư vấn';
var HEADERS = ['Thời gian', 'Họ và tên', 'Số điện thoại / Zalo', 'Công việc / kinh nghiệm', 'Mục tiêu tham gia', 'Trang nguồn', 'Trạng thái'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var p = (e && e.parameter) || {};

    // Bẫy chống spam: trường ẩn "website" chỉ bot mới điền.
    if (p.website) return json_({ result: 'success' });

    var name = clean_(p.name);
    var phone = clean_(p.phone).replace(/^'/, '');
    if (!name || !phone) return json_({ result: 'error', message: 'Thiếu họ tên hoặc số điện thoại' });

    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      name,
      "'" + phone,            // giữ số 0 ở đầu số điện thoại
      clean_(p.job),
      clean_(p.goal),
      clean_(p.source),
      'Mới'
    ]);
    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Mở URL /exec trên trình duyệt để kiểm tra script đã chạy.
function doGet() {
  return json_({ result: 'ok', message: 'SmartKey form endpoint đang hoạt động' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0E1E3D').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');
    sheet.setColumnWidths(1, HEADERS.length, 180);
  }
  return sheet;
}

// Làm sạch dữ liệu, giới hạn độ dài và chặn chèn công thức vào Sheet.
function clean_(v) {
  v = String(v == null ? '' : v).trim().slice(0, 1000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
