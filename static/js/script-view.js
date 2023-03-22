//  // View Requests References and general setup
const viewAllGrid = document.getElementById('view-all-grid');

const requests = new Records();
// Get requests list from API
// const list = await requests.buildRecords();

// localStorage List
const storedList = JSON.parse(localStorage.getItem('records'));

// ---------------------------------------------- //
// View all Requests onClick Action functionality
function viewAll(event) {
  // event.preventDefault();
  console.log(storedList, 'storedNames');

  // Initial List-View builder
  storedList.map((request) => {
    // const { id, name, idea, url } = request;
    viewAllGrid.innerHTML += addListItem(request);
  });
}

// viewRequests.addEventListener('click', viewAll, { once: true });
// Register View Requests Global EventListener
// document.addEventListener(
//   'click',
//   (event) => {
//     if (event.target.classList.contains('view-btn')) {
//       viewAll(event);
//     }
//   },
//   { once: true }
// );

window.addEventListener('load', () => {
  // const records = new Records();
  viewAll();
});

// Update Request handler
function handleUpdateRequest(event) {
  event.preventDefault();

  const targetId = event.target.getAttribute('data-id');
  const targetRef = document.getElementById(targetId);
  const nameRef = targetRef.querySelector('.card-inner-title');
  const ideaRef = targetRef.querySelector('.card-inner-content');
  const editBtnRef = targetRef.querySelector('.fa-pen-to-square');
  const saveBtnRef = targetRef.querySelector('.fa-paper-plane');

  nameRef.contentEditable = 'true';
  nameRef.classList.add('content-editable');

  ideaRef.contentEditable = 'true';
  ideaRef.classList.add('content-editable');

  editBtnRef.classList.toggle('hidden');
  saveBtnRef.classList.toggle('hidden');

  nameRef.focus();
}

function handleSaveRequest(event) {
  event.preventDefault();

  const targetId = event.target.getAttribute('data-id');
  const targetRef = document.getElementById(targetId);
  const nameRef = targetRef.querySelector('.card-inner-title');
  const ideaRef = targetRef.querySelector('.card-inner-content');
  const editBtnRef = targetRef.querySelector('.fa-pen-to-square');
  const saveBtnRef = targetRef.querySelector('.fa-paper-plane');
  const saveAlert = targetRef.querySelector('.card-inner-alert');

  if (
    nameRef.innerText.trim().length === 0 ||
    ideaRef.innerText.trim().length === 0
  ) {
    saveAlert.classList.remove('hidden');
    saveAlert.innerHTML = 'Invalid Data!';
    return;
  }

  // Call Update Record
  const updateTarget = new Record();
  updateTarget.updateRecord(
    targetId,
    nameRef.innerText.trim(),
    ideaRef.innerText.trim()
  );

  nameRef.contentEditable = 'false';
  nameRef.classList.remove('content-editable');

  ideaRef.contentEditable = 'false';
  ideaRef.classList.remove('content-editable');

  editBtnRef.classList.toggle('hidden');
  saveBtnRef.classList.toggle('hidden');

  saveAlert.classList.add('hidden');
  saveAlert.innerText = '';
}

async function handleDeleteRequest(event) {
  event.preventDefault();

  const targetId = event.target.getAttribute('data-id');

  // storedList.filter((rec) => rec.id !== targetId);

  // Call new Record - delete method
  const target = new Record();
  await target.deleteRecord(targetId);

  // Redirect to Dashboard
  window.location = `${baseURL}/view`;
}

// Register View-Edit Request Global EventListener
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-pen-to-square')) {
    handleUpdateRequest(event);
  }
  if (event.target.classList.contains('fa-paper-plane')) {
    handleSaveRequest(event);
  }
  if (event.target.classList.contains('fa-trash')) {
    handleDeleteRequest(event);
  }
});
