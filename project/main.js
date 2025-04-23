let danhsachHistory = document.getElementById("danhsachHistory");

function getFormData(formEL) {
    let data = {};
    for (element of formEL.elements) {
        if (element.name != "") {
            data[element.name] = element.value;
        }
    }
    return data;
}
    
/* Lib validate */
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* local */
function saveUserListToLocal(userList) {
    localStorage.setItem("userList", JSON.stringify(userList));
}

/* authen account */
function getUserLoginData() {
    let userData = JSON.parse(localStorage.getItem("userLogin"));
    return userData;
}

function handleAccountAction(action) {
    if (action === "login") {
        window.location.href = "index.html";
    } else if (action === "logout") {
        localStorage.removeItem("userLogin");
        alert("Bạn đã đăng xuất!");
        window.location.href = "/authen/"; // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    }
}

const historyList = [
    {
        tienchitieu: "Tiền phòng",
        ghichu: "Đóng tiền phòng tháng 3",
        sotien: "2,000,000 VND"
    },
    {
        tienchitieu: "Tiền điện",
        ghichu: "Đóng tiền điện tháng 3",
        sotien: "500,000 VND"
    },
    {
        tienchitieu: "Tiền nước",
        ghichu: "Đóng tiền nước tháng 3",
        sotien: "300,000 VND"
    },
    {
        tienchitieu: "Tiền ăn",
        ghichu: "Mua đồ ăn cho cả tháng",
        sotien: "1,500,000 VND"
    },
];

function themChiTieu() {
    const soTien = document.getElementById("soTien").value;
    const tenChiTieu = document.getElementById("tenChiTieu").value;
    const ghiChu = document.getElementById("ghiChu").value;

    if (!soTien || !tenChiTieu) {
        alert("Vui lòng nhập đủ thông tin");
        return;
    }

    const newItem = {
        tienchitieu: tenChiTieu,
        ghichu: ghiChu,
        sotien: `${parseInt(soTien).toLocaleString()} VND`
    };

    const currentHistory = JSON.parse(localStorage.getItem("historyList")) || [];
    currentHistory.push(newItem);
    localStorage.setItem("historyList", JSON.stringify(currentHistory));

    renderHistory(document.getElementById("danhSachHistory")); //
    renderHistory(danhsachHistory);
}


function timKiem() {
    const searchVal = document.getElementById("search").value.toLowerCase();
    const history = JSON.parse(localStorage.getItem("historyList")) || [];

    const filtered = history.filter(item =>
        item.tienchitieu.toLowerCase().includes(searchVal) ||
        item.ghichu.toLowerCase().includes(searchVal)
    );

    danhsachHistory.innerHTML = "";
    filtered.forEach(item => {
        let li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
        <div class="history-item-content">
            <p>${item.tienchitieu}</p>
            <p>${item.ghichu}</p>
            <span>${item.sotien}</span>
        </div>
        `;
        danhsachHistory.appendChild(li);
    });
}

function sapXepTheoGia() {
    const history = JSON.parse(localStorage.getItem("historyList")) || [];
    history.sort((a, b) => {
        const giaA = parseInt(a.sotien.replace(/[^0-9]/g, ""));
        const giaB = parseInt(b.sotien.replace(/[^0-9]/g, ""));
        return giaA - giaB;
    });
    localStorage.setItem("historyList", JSON.stringify(history));
    renderHistory(); // Gọi lại hàm renderHistory sau khi đã sắp xếp
}


function renderHistory(container = danhsachHistory) {
    container.innerHTML = "";

    let storedHistory = JSON.parse(localStorage.getItem("historyList")) || [];

    storedHistory.forEach(function (item, index) {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>Danh mục:</strong> ${item.tienchitieu} <br>
            <strong>Ghi chú:</strong> ${item.ghichu} <br>
            <strong>Số tiền:</strong> ${item.sotien} <br>
            <button onclick="xoaChiTieu(${index})">Xóa</button>
            <hr>
        `;
        container.appendChild(li);
    });
}



function xoaChiTieu(index) {
    const currentHistory = JSON.parse(localStorage.getItem("historyList")) || [];
    if (confirm("Bạn có chắc muốn xóa mục này không?")) {
        currentHistory.splice(index, 1);
        localStorage.setItem("historyList", JSON.stringify(currentHistory));
        renderHistory();
    }
}
// Khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function () {
    // Gắn sự kiện click cho nút
    document.getElementById("btnThemDanhMuc").addEventListener("click", themDanhMuc);
  
    // Hiển thị danh sách đã lưu
    hienThiDanhMuc();
  });
  
  function themDanhMuc() {
    const input = document.getElementById("tenDanhMuc");
    const ten = input.value.trim();
  
    // Kiểm tra rỗng
    if (ten === "") {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }
  
    // Lấy danh sách cũ từ localStorage hoặc rỗng
    const ds = JSON.parse(localStorage.getItem("danhMuc")) || [];
  
    // Thêm danh mục mới
    ds.push(ten);
  
    // Lưu lại vào localStorage
    localStorage.setItem("danhMuc", JSON.stringify(ds));
  
    // Xóa ô input
    input.value = "";
  
    // Hiển thị lại danh sách
    hienThiDanhMuc();
  }
  
  function hienThiDanhMuc() {
    const danhSachUl = document.getElementById("dsDanhMuc");
    const ds = JSON.parse(localStorage.getItem("danhMuc")) || [];
  
    // Xóa danh sách cũ
    danhSachUl.innerHTML = "";
  
    // Hiển thị từng danh mục
    ds.forEach(function (ten) {
      const li = document.createElement("li");
      li.textContent = ten;
      danhSachUl.appendChild(li);
    });
  }
  

document.addEventListener("DOMContentLoaded", function () {
    let danhsachHistory = document.getElementById("danhSachHistory");

    if (!localStorage.getItem("historyList")) {
        localStorage.setItem("historyList", JSON.stringify([]));
    }

    renderHistory(danhsachHistory); // Truyền vào phần tử cần render
});

