function showIdea() {
  var box = document.getElementById("ideaBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function showSystem() {
  window.location.href = "dashboard.html";
}

function goDashboard() {
  window.location.href = "dashboard.html";
}

// Hàm mở Thư viện văn bản
function openLibrary() {
  window.location.href = "thu_vien_van_ban.html";
}

// Hàm mở Thư viện bài giảng
function openLessons() {
  window.location.href = "lesson.html";
}

// Hàm mở Trợ lý AI
function openAIAssistant() {
  // Có thể tạo trang AI assistant sau hoặc hiển thị modal
  alert("Chức năng Trợ lý AI đang được phát triển. Vui lòng quay lại sau!");
  // window.location.href = "ai-assistant.html";
}

// Hàm mở Trắc nghiệm
function openQuiz() {
  window.location.href = "cauhoi_tracnghiem.html";
}
