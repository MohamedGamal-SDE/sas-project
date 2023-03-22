//  // View Requests References and general setup
const viewAllGrid = document.getElementById('view-all-grid');

let requests = new Records();
// Get requests list from API
// let list = await requests.buildRecords();

// localStorage List
const storedList = JSON.parse(localStorage.getItem('records'));

// ---------------------------------------------- //
// View all Requests onClick Action functionality
function viewAll(event) {
  event.preventDefault();
  console.log(storedList, 'storedNames');

  // Initial List-View builder
  storedList.map((request) => {
    // const { id, name, idea, url } = request;
    viewAllGrid.innerHTML += addListItem(request);
  });
}

// viewRequests.addEventListener('click', viewAll, { once: true });
// Register View Requests Global EventListener
document.addEventListener(
  'click',
  (event) => {
    if (event.target.classList.contains('view-btn')) {
      viewAll(event);
    }
  },
  { once: true }
);
