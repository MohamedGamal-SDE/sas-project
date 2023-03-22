// ============================================= //
//  Request Build (POST) Setup
// ============================================= //

// // Request Build References and general setup
const reqForm = document.getElementById('req-build-form');
const reqName = document.getElementById('req-build-name');
const reqIdea = document.getElementById('req-build-idea');
const reqURL = document.getElementById('req-build-url');
const reqBtn = document.getElementById('req-build-btn');
const reqAlert = document.getElementById('from-alert');
let appMsg = '<div class="form-msg">Request Success</div>';

async function handleCreateRequest(event) {
  event.preventDefault();

  let request = new Record(reqName.value, reqIdea.value, reqURL.value);
  request.createRecord();

  // Notify user of Request Success
  reqAlert.innerHTML = appMsg;

  // Rest Form Stats
  resetForm();

  setTimeout(() => {
    // Reset Form Msg After 2 sec
    reqAlert.innerHTML = '';
  }, 2000);
}

reqForm.addEventListener('submit', handleCreateRequest);
