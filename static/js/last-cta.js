// ============================================= //
// Switching Dashboard / login routes @ Last CTA
// ============================================= //
const lastCTA = document.getElementById('last-cta');

if (!loggedIn) {
  lastCTA.innerHTML = innerLog;
} else {
  lastCTA.innerHTML = innerDah;
}
