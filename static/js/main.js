// ============================================= //
// Global Setup
// ============================================= //
const baseURL = window.location.origin;
const currentLocation = window.location.pathname;
// `http://127.0.0.1:5000/api/v1`
const baseApiURL = `${baseURL}/api/v1`;

function delayReset(el) {
  setTimeout(() => {
    // Reset Form Msg After 2 sec
    el.innerHTML = '';
  }, 2000);
}

// Error Block
const errorBlock = document.querySelector('.error-block');
function errorBlockMsg(error) {
  errorBlock.innerHTML = `Error: ${error}`;
}
