// ============================================= //
//           Shared JS Header Setup
// ============================================= //
// JS Header Content
const headerJSContent = `
<!-- Top-Line -->
<div class="top-line"></div>

<header>
  <!-- Navbar- START-->
  <nav class="navbar">
    <ul class="menu">
      <!-- Logo -->
      <li class="logo">
        <a href="/">SAS</a>
      </li>

      <!-- Nav-Links -->
      <li class="item divider">
        <a href="/">Home</a>
      </li>
      <li class="item" id="switch-topnav"></li>

      <!-- CTA -->
      <li class="item cta-btn--top" id="switch-topcta">
        <a href="/request">Request Build</a>
      </li>

      <!-- Toggler -->
      <li class="toggle">
        <a href="#"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <!-- Navbar- END-->
  </nav>
</header>
`;

// ============================================= //
// Switching Dashboard / login routes when appropriate
// ============================================= //
// Binding Header to HTML
const headerJS = document.getElementById('header-js');
headerJS.innerHTML = headerJSContent;

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

// Setup Dashboard / LogIn Navbar Link Switcher
const switchTopNav = document.getElementById('switch-topnav');
const switchTopCTA = document.getElementById('switch-topcta');

if (!loggedIn) {
  switchTopNav.innerHTML = `<a href="/login">LogIn</a>`;
  switchTopCTA.innerHTML = `<a href="/login">Request Build</a>`;
} else {
  switchTopNav.innerHTML = `<a href="/dashboard">Dashboard</a>`;
  switchTopCTA.innerHTML = `<a href="/request">Request Build</a>`;
}

// ============================================= //
// Build Hamburger menu toggler
// ============================================= //
// Initial setup
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');

// toggler onClick functionality
function toggleMenu() {
  if (menu.classList.contains('active')) {
    // Handle open:
    // Close and Show Hamburger icon
    menu.classList.remove('active');
    toggle.querySelector('a').innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    // Handle close:
    // Open and Show close icon
    menu.classList.add('active');
    toggle.querySelector('a').innerHTML = "<i class='fas fa-times'></i>";
  }
}

// Trigger the toggler when menu clicked
toggle.addEventListener('click', toggleMenu);
