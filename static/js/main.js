// ============================================= //
// Global Setup
// ============================================= //
const baseURL = window.location.origin;
const currentLocation = window.location.pathname;
// `http://127.0.0.1:5000/api/v1`
const baseApiURL = `${baseURL}/api/v1`;

// ============================================= //
// LogIn Page Setup
// ============================================= //

if (!loggedIn && currentLocation === '/login') {
  // General Setup
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const sendBtn = document.getElementById('send');
  const formNotify = document.getElementById('from-notify');
  let notifyMsg = `<div class="form-msg">Invalid Data!</div>`;
  let notifyMsgMissing = `<div class="form-msg">Please fill both fields!</div>`;
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

        // Redirect to Dashboard
        window.location = `${baseURL}/dashboard`;
      } else {
        username.value = '';
        password.value = '';
        formNotify.innerHTML = notifyMsg;
      }
    } else {
      // username.value = '';
      // password.value = '';
      formNotify.innerHTML = notifyMsgMissing;
    }
  }

  sendBtn.addEventListener('click', setLogin);
}

// ============================================= //
// Dashboard Section Setup
// ============================================= //
// // ==== General Dashboard Setup ====
const reqBuild = document.getElementById('req-build');
const viewRequests = document.getElementById('view-requests');

const isDashboard = () => {
  if (
    currentLocation === '/dashboard' ||
    currentLocation === '/request' ||
    currentLocation === '/view'
  ) {
    return true;
  } else {
    return false;
  }
};

// // Request Build References and general setup
const reqForm = document.getElementById('req-build-form');
const reqName = document.getElementById('req-build-name');
const reqIdea = document.getElementById('req-build-idea');
const reqURL = document.getElementById('req-build-url');
const reqBtn = document.getElementById('req-build-btn');
const reqAlert = document.getElementById('from-alert');
let curState = {
  appName: '',
  appIdea: '',
  appURL: '',
  appMsg: '',
};

class Records {
  constructor() {
    this.list = [];
  }
}

let requests = new Records();
