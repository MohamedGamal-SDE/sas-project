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

// ============================================= //
//  View and fetch Requests (GET) Setup
// ============================================= //

//  // View Requests References and general setup
const viewAllUl = document.getElementById('view-all-ul');

// === Requests List factory (Class) ===
class Records {
  constructor() {
    // this.list = this.buildRecords() || [];
    this.list = [];
  }

  // Check if method is used as event or no,
  // If event preventDefault
  isEvent(event) {
    if (event) {
      event.preventDefault();
    }
  }

  // Fetch Records From API Functionality
  async fetchAll(event) {
    this.isEvent(event);

    try {
      const response = await axios.get(baseApiURL);
      const records = response.data.result;
      return records;
    } catch (error) {
      // === DEV-ONLY ===
      console.log('Error...', error);
    }
  }

  // Build Records From Fetched API Data Functionality
  async buildRecords(event) {
    this.isEvent(event);
    let fetchedList = await this.fetchAll();

    // Clear OldList
    this.list = [];

    // Build with new Data
    fetchedList.map((r) => {
      this.list.push(r);
    });

    return this.list;
  }
}

// ---------------------------------------------- //
// View all Requests onClick Action functionality
async function viewAll(event) {
  // Get requests list from API
  let requests = new Records();
  let list = await requests.buildRecords(event);

  // Initial List-View builder
  list.map((request) => {
    const { id, name, idea, url } = request;
    viewAllUl.innerHTML += `<li class="view-all-items"><p> id: ${id}, name: ${name}, idea: ${idea}, url: ${url}</p></li>`;
  });
}

viewRequests.addEventListener('click', viewAll, { once: true });

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
let appMsg = '';
function resetForm() {
  reqName.value = '';
  reqIdea.value = '';
  reqURL.value = '';
}

// === Request factory (Class) ===
class Record extends Records {
  constructor(name, idea, url) {
    super();
    this.name = name;
    this.idea = idea;
    this.url = url;
  }

  // Unique Random ID generator Utils
  uniqueId() {
    return (
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36)
    );
  }

  buildRecord() {
    let record = {
      id: this.uniqueId(),
      name: this.name,
      idea: this.idea,
      url: this.url,
    };
    return record;
  }

  // Create (POST) Record fetch functionality
  async createRecord(event) {
    this.isEvent();

    let newRecord = this.buildRecord();

    let config = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      await axios.post(baseApiURL, JSON.stringify(newRecord), config);
    } catch (error) {
      // === DEV-ONLY ===
      console.log('Error...', error);
    }
  }
}

async function handleCreateRequest(event) {
  event.preventDefault();

  let request = new Record(reqName.value, reqIdea.value, reqURL.value);
  request.createRecord();
  resetForm();
}

reqForm.addEventListener('submit', handleCreateRequest);
