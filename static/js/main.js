// Build Hamburger menu toggler
// Initial setup
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');

// toggler onClick functionality
function toggleMenu() {
  if (menu.classList.contains('active')) {
    // Handle if its open:
    // Close and Show Hamburger icon
    menu.classList.remove('active');
    toggle.querySelector('a').innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    // Handle if its close:
    // Open and Show close icon
    menu.classList.add('active');
    toggle.querySelector('a').innerHTML = "<i class='fas fa-times'></i>";
  }
}

// Trigger the toggler when menu clicked
toggle.addEventListener('click', toggleMenu);
