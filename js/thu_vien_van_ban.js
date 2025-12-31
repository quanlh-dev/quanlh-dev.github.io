// Danh sách các văn bản được nhóm theo category
const documentCategories = {
  "TẤT CẢ": [
    {
      name: "Luật An ninh mạng",
      file: "data/vanban/Luật an ninh mạng.docx",
      icon: "📄",
    },
    {
      name: "Luật Dân quân tự vệ 2019",
      file: "data/vanban/Luật Dân quân tự vệ 2019.docx",
      icon: "📄",
    },
    {
      name: "Luật Hôn nhân và gia đình",
      file: "data/vanban/Luật hôn nhân và gia đình.docx",
      icon: "📄",
    },
    {
      name: "Luật Nghĩa vụ quân sự",
      file: "data/vanban/Luật nghĩa vụ quân sự.docx",
      icon: "📄",
    },
    {
      name: "Luật Phòng, chống ma túy",
      file: "data/vanban/Luật phòng chống ma tuý.docx",
      icon: "📄",
    },
    {
      name: "Nghị định 168 - Giao thông",
      file: "data/vanban/Nghị định 168 - Giao thông.docx",
      icon: "📋",
    },
    {
      name: "Nghị định 218-2025-TT-BQP",
      file: "data/vanban/Nghị định 218-2025-TT-BQP.docx",
      icon: "📋",
    },
    {
      name: "Sửa đổi, bổ sung một số điều của 11 Luật về QS,QP",
      file: "data/vanban/SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA 11 LUẬT VỀ QS,QP.pdf",
      icon: "📑",
    },
    {
      name: "Thông tư 105/2025-TT-BQP",
      file: "data/vanban/Thông tư 1052025-TT-BQP.docx",
      icon: "📋",
    },
    {
      name: "Thông tư 68/2025-TT-BQP",
      file: "data/vanban/Thông tư 682025TT-BQP.docx",
      icon: "📋",
    },
  ],
  LUẬT: [
    {
      name: "Luật An ninh mạng",
      file: "data/vanban/Luật an ninh mạng.docx",
      icon: "📄",
    },
    {
      name: "Luật Dân quân tự vệ 2019",
      file: "data/vanban/Luật Dân quân tự vệ 2019.docx",
      icon: "📄",
    },
    {
      name: "Luật Hôn nhân và gia đình",
      file: "data/vanban/Luật hôn nhân và gia đình.docx",
      icon: "📄",
    },
    {
      name: "Luật Nghĩa vụ quân sự",
      file: "data/vanban/Luật nghĩa vụ quân sự.docx",
      icon: "📄",
    },
    {
      name: "Luật Phòng, chống ma túy",
      file: "data/vanban/Luật phòng chống ma tuý.docx",
      icon: "📄",
    },
  ],
  "NGHỊ ĐỊNH": [
    {
      name: "Nghị định 168 - Giao thông",
      file: "data/vanban/Nghị định 168 - Giao thông.docx",
      icon: "📋",
    },
    {
      name: "Nghị định 218-2025-TT-BQP",
      file: "data/vanban/Nghị định 218-2025-TT-BQP.docx",
      icon: "📋",
    },
  ],
  "THÔNG TƯ": [
    {
      name: "Thông tư 105/2025-TT-BQP",
      file: "data/vanban/Thông tư 1052025-TT-BQP.docx",
      icon: "📋",
    },
    {
      name: "Thông tư 68/2025-TT-BQP",
      file: "data/vanban/Thông tư 682025TT-BQP.docx",
      icon: "📋",
    },
  ],
  KHÁC: [
    {
      name: "Sửa đổi, bổ sung một số điều của 11 Luật về QS,QP",
      file: "data/vanban/SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA 11 LUẬT VỀ QS,QP.pdf",
      icon: "📑",
    },
  ],
};

let currentActiveCategory = null;

// Hàm đóng modal
function closeModal() {
  const modal = document.getElementById("docxModal");
  modal.style.display = "none";
  document.getElementById("modalBody").innerHTML =
    '<div class="loading">Đang tải nội dung</div>';
}

// Đóng modal khi click bên ngoài
window.onclick = function (event) {
  const modal = document.getElementById("docxModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Hàm xem file trực tiếp
async function viewFile(filePath, fileName) {
  const fileExtension = filePath.split(".").pop().toLowerCase();

  if (fileExtension === "pdf") {
    // PDF: Hiển thị bằng iframe trong modal
    await displayPDF(filePath, fileName);
  } else if (fileExtension === "docx" || fileExtension === "doc") {
    // DOCX: Sử dụng docx-preview để render
    await displayDocx(filePath, fileName);
  } else {
    // File khác: Mở trực tiếp
    window.open(filePath, "_blank");
  }
}

// Hàm hiển thị PDF bằng iframe
async function displayPDF(filePath, fileName) {
  const modal = document.getElementById("docxModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modal.style.display = "block";
  modalTitle.textContent = fileName;
  modalBody.innerHTML = '<div class="loading">Đang tải PDF</div>';

  try {
    // Tạo iframe để hiển thị PDF
    modalBody.innerHTML =
      '<iframe id="pdfFrame" width="100%" height="90vh" style="border:none"></iframe>';
    const pdfFrame = document.getElementById("pdfFrame");

    // Set src của iframe để hiển thị PDF
    pdfFrame.src = filePath;
  } catch (error) {
    console.error("Lỗi khi hiển thị PDF:", error);
    modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b40000;">
                <p style="font-size: 18px; margin-bottom: 10px;">❌ Không thể tải PDF</p>
                <p style="color: #666;">${error.message}</p>
                <p style="margin-top: 20px;">
                    <button onclick="downloadFile('${filePath}')" class="download-btn" style="margin: 0;">
                        ⬇️ Tải file về
                    </button>
                </p>
            </div>
        `;
  }
}

// Hàm hiển thị DOCX bằng docx-preview
async function displayDocx(filePath, fileName) {
  const modal = document.getElementById("docxModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modal.style.display = "block";
  modalTitle.textContent = fileName;
  modalBody.innerHTML = '<div class="loading">Đang tải và render file</div>';

  try {
    // Fetch DOCX file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Không thể tải file DOCX");
    }

    const arrayBuffer = await response.arrayBuffer();

    // Tạo container để render DOCX
    modalBody.innerHTML =
      '<div id="docx-container" class="docx-container"></div>';
    const container = document.getElementById("docx-container");

    // Kiểm tra các thư viện đã load chưa
    if (typeof JSZip === "undefined") {
      throw new Error("JSZip chưa được load. Vui lòng tải lại trang.");
    }

    if (typeof docx === "undefined" || !docx.renderAsync) {
      if (typeof docxjs === "undefined" || !docxjs.renderAsync) {
        throw new Error(
          "Thư viện docx-preview chưa được load. Vui lòng tải lại trang."
        );
      }
    }

    const renderFunction =
      docx && docx.renderAsync ? docx.renderAsync : docxjs.renderAsync;

    // Render DOCX - không override style, để docx-preview tự render
    await renderFunction(arrayBuffer, container, null, {
      className: "docx-wrapper",
      inWrapper: true,
      ignoreWidth: true,
      ignoreHeight: true,
      breakPages: false,
    });

    console.log("DOCX đã được render thành công");
  } catch (error) {
    console.error("Lỗi khi render DOCX:", error);
    modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b40000;">
                <p style="font-size: 18px; margin-bottom: 10px;">❌ Không thể render file</p>
                <p style="color: #666;">${
                  error.message || "Lỗi không xác định"
                }</p>
                <p style="margin-top: 20px;">
                    <button onclick="downloadFile('${filePath}')" class="download-btn" style="margin: 0;">
                        ⬇️ Tải file về
                    </button>
                </p>
            </div>
        `;
  }
}

// Hàm tải file (dùng khi có lỗi)
function downloadFile(filePath) {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = filePath.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Hàm tạo sidebar với danh sách category
function createSidebar() {
  const categoryList = document.getElementById("categoryList");

  Object.keys(documentCategories).forEach((categoryName, index) => {
    const categoryItem = document.createElement("li");
    categoryItem.className = "category-item" + (index === 0 ? " active" : "");
    categoryItem.onclick = () => selectCategory(categoryName);

    const categoryNameSpan = document.createElement("span");
    categoryNameSpan.className = "category-item-name";
    categoryNameSpan.textContent = categoryName;

    categoryItem.appendChild(categoryNameSpan);
    categoryList.appendChild(categoryItem);
  });
}

// Hàm chọn category và hiển thị danh sách văn bản tương ứng
function selectCategory(categoryName) {
  // Cập nhật active state trong sidebar
  const categoryItems = document.querySelectorAll(".category-item");
  categoryItems.forEach((item) => {
    if (
      item.querySelector(".category-item-name").textContent === categoryName
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Cập nhật tiêu đề
  const categoryTitle = document.getElementById("categoryTitle");
  if (categoryTitle) {
    categoryTitle.textContent = `📄 ${categoryName}`;
  }

  // Hiển thị danh sách văn bản của category được chọn
  const documents = documentCategories[categoryName];
  if (documents && documents.length > 0) {
    loadDocuments(documents);
    currentActiveCategory = categoryName;
  }
}

// Hàm tạo danh sách văn bản
function loadDocuments(documents) {
  const list = document.getElementById("documentList");
  list.innerHTML = "";

  if (!documents || documents.length === 0) {
    list.innerHTML =
      '<li style="text-align: center; padding: 40px; color: #666;">Không có văn bản nào trong danh mục này</li>';
    return;
  }

  documents.forEach((doc) => {
    const li = document.createElement("li");
    li.className = "document-item";

    const nameDiv = document.createElement("div");
    nameDiv.className = "document-name";
    nameDiv.innerHTML = `<span class="file-icon">${doc.icon}</span>${doc.name}`;

    // Tạo nhóm nút
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Nút Xem
    const fileExtension = doc.file.split(".").pop().toLowerCase();
    const viewLink = document.createElement("a");
    viewLink.href = "#";
    viewLink.className = "view-btn";
    viewLink.textContent = "👁️ Xem";

    viewLink.onclick = function (e) {
      e.preventDefault();
      viewFile(doc.file, doc.name);
    };

    // Nút Tải xuống
    const downloadLink = document.createElement("a");
    downloadLink.href = doc.file;
    downloadLink.download = doc.file.split("/").pop();
    downloadLink.className = "download-btn";
    downloadLink.textContent = "⬇️ Tải xuống";
    downloadLink.onclick = function (e) {
      console.log("Đang tải: " + doc.name);
    };

    buttonGroup.appendChild(viewLink);
    buttonGroup.appendChild(downloadLink);

    li.appendChild(nameDiv);
    li.appendChild(buttonGroup);
    list.appendChild(li);
  });
}

// Tải sidebar và danh sách đầu tiên khi trang được load
window.onload = function () {
  // Tạo sidebar
  createSidebar();

  // Hiển thị danh sách category đầu tiên
  const firstCategory = Object.keys(documentCategories)[0];
  if (firstCategory) {
    selectCategory(firstCategory);
  }
};
