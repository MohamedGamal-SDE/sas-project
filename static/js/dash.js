// General Setup
const dashboard = document.getElementById('dashboard');
function dashCP() {
  return (dashboard.innerHTML = dashContent);
}
function dashLogin() {
  return (dashboard.innerHTML = dashLogForm);
}

// Check if Logged in (Saved at localStorage)
function isLoggedIn() {
  let storedUser = localStorage.getItem('username');
  let storedPass = localStorage.getItem('password');
  let auth = storedUser && storedPass;

  if (auth !== null && auth !== '') {
    return true;
  } else {
    return false;
  }
}
const loggedIn = isLoggedIn();

// LogIn Page Setup
if (!loggedIn) {
  // Load LogIn form
  dashLogin();

  // General Setup
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const sendBtn = document.getElementById('send');
  const formNotify = document.getElementById('from-notify');
  let notifyMsg = `<div class="form-msg">Invalid Data!</div>`;
  let currentUser = '';
  let currentPass = '';

  // Login Action
  function setLogin(event) {
    event.preventDefault();

    let emptyAuth =
      username.value.trim() !== '' && password.value.trim() !== '';
    let loginAuth =
      username.value.trim() === 'demo' && password.value.trim() === '1234';

    // Check guard for Empty/Whitespace inputs
    if (emptyAuth) {
      // Successful Login
      if (loginAuth) {
        currentUser = username.value.trim();
        currentPass = password.value.trim();

        formNotify.innerHTML = `<div class="form-msg">Successful</div>`;

        // Save to localStorage
        localStorage.setItem('username', currentUser);
        localStorage.setItem('password', currentPass);

        // Loads Dashboard
        dashCP();
      } else {
        formNotify.innerHTML = notifyMsg;
      }
    } else {
      formNotify.innerHTML = notifyMsg;
    }
  }

  sendBtn.addEventListener('click', setLogin);
} else {
  dashCP();
}
