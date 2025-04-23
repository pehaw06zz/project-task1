let userList = JSON.parse(localStorage.getItem("userList")) || [];

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

// Chuyển sang form Đăng ký
toRegister.addEventListener('click', event => {
  event.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// Chuyển sang form Đăng nhập
toLogin.addEventListener('click', event => {
  event.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Hàm xử lý đăng nhập
function login(event) {
  event.preventDefault();
  const formLoginEL = event.target;
  const data = getFormData(formLoginEL);

  const userData = userList.find(user => user.email === data.email);

  if (!userData) {
    alert("Người dùng không tồn tại");
    return;
  }

  if (userData.password !== data.password) {
    alert("Mật khẩu không chính xác");
    return;
  }

  localStorage.setItem("userLogin", JSON.stringify(userData));
  alert("Đăng nhập thành công!");
  window.location.href = "/";
}

// Hàm xử lý đăng ký
function register(event) {
  event.preventDefault();

  if (!confirm("Bạn xác nhận các thông tin là chính xác chưa?")) return;

  const formRegisterEL = event.target;
  const data = getFormData(formRegisterEL);
  if (data.password !== data.confirmPassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp");
    return;
  }

  if (!validateEmail(data.email)) {
    alert("Email chưa đúng định dạng");
    return;
  }

  if (!data.password || data.password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }

  if (userList.find(user => user.email === data.email)) {
    alert("Email đã tồn tại");
    return;
  }

  data.role = "USER";
  userList.push(data);
  saveUserListToLocal(userList);

  formRegisterEL.reset();
  alert("Đăng ký thành công! Bạn sẽ được chuyển về trang đăng nhập.");

  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
}

