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
    // || currentLocation === '/update'
  ) {
    return true;
  } else {
    return false;
  }
};

// ============================================= //
//  View and fetch Requests (GET) Setup
// ============================================= //

// ======== Requests List factory (Class) - (s)========
class Records {
  constructor() {
    // this.list = this.buildRecords() || [];
    this.list = [];
    this.buildRecords();
  }

  // Check if method is used as event or no,
  // If event preventDefault
  isEvent(event) {
    if (event) {
      event.preventDefault();
    }
  }

  // Clear List
  resetList() {
    this.list = [];
    localStorage.removeItem('records');
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
    this.resetList();

    // Build with new Data
    fetchedList.map((r) => {
      this.list.push(r);
    });

    localStorage.setItem('records', JSON.stringify(this.list));
    return this.list;
  }
}
// ======== Requests List factory (Class) - (e) ========

function resetForm() {
  reqName.value = '';
  reqIdea.value = '';
  reqURL.value = '';
}

// ======== Request factory (Class) - (s) ========
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

      // ReBuild Record List
      this.buildRecords();
    } catch (error) {
      // === DEV-ONLY ===
      console.log('Error...', error);
    }
  }
}
// ======== Request factory (Class) - (s) ========
