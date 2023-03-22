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

    // Stronger Password to prevent chrome weak pass alert
    let loginAuth =
      username.value.trim() === 'demo' &&
      password.value.trim() === 'FakePass032023';

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
        delayReset(formNotify);
      }
    } else {
      formNotify.innerHTML = notifyMsgMissing;
      delayReset(formNotify);
    }
  }

  sendBtn.addEventListener('click', setLogin);
}
