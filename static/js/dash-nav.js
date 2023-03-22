// ============================================= //
//           Shared JS Header Setup
// ============================================= //
// JS Header Content
const dashNavContent = `
<nav>
<ul class="dash-nav">
  <li class="dash-nav-btn" >
    <a href="/request" id="req-build" class="req-btn">Request App Build</a>
  </li>
  <li class="dash-nav-btn" >
    <a href="/view" id="view-requests" class="view-btn">View all Requests</a>
  </li>
</ul>
</nav>
`;

const dashNav = document.getElementById('dash-nav');
dashNav.innerHTML = dashNavContent;
