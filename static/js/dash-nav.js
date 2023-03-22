// ============================================= //
//           Shared JS Header Setup
// ============================================= //
// JS Header Content
const dashNavContent = `
<nav>
<ul class="dash-nav">
  <li class="dash-nav-btn" id="req-build">
    <a href="/request">Request App Build</a>
  </li>
  <li class="dash-nav-btn" id="view-requests">
    <a href="/view">View all Requests</a>
  </li>
</ul>
</nav>
`;

const dashNav = document.getElementById('dash-nav');
dashNav.innerHTML = dashNavContent;
