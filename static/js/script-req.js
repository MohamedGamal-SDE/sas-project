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
let successMsg = '<div class="form-msg">Request Success</div>';
let invalidMsg = '<div class="form-msg">Invalid Entry</div>';

function resetForm() {
  reqName.value = '';
  reqIdea.value = '';
  reqURL.value = '';
}

async function handleCreateRequest(event) {
  event.preventDefault();

  // Check For whitespace Entry
  if (reqName.value.trim() === '' || reqIdea.value.trim() === '') {
    reqAlert.innerHTML = invalidMsg;
    delayReset(reqAlert, 800);
  } else {
    let request = new Record(reqName.value, reqIdea.value, reqURL.value);
    request.createRecord();

    // Notify user of Request Success
    reqAlert.innerHTML = successMsg;
    delayReset(reqAlert);
  }

  // Rest Form Stats
  resetForm();
}

reqForm.addEventListener('submit', handleCreateRequest);
