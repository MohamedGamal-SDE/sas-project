// ============================================= //
// Switching Dashboard / login routes @ Hero
// ============================================= //
const switchHero = document.getElementById('switch-hero');

let innerLog = `<a href="/login" class="cta-btn--hero">Get Your Dream APP Now!</a>`;
let innerDah = `<a href="/dashboard" class="cta-btn--hero">Get Your Dream APP Now!</a>`;

if (!loggedIn) {
  switchHero.innerHTML = innerLog;
} else {
  switchHero.innerHTML = innerDah;
}
