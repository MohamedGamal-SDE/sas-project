// ============================================= //
// Switching Dashboard / login routes @ Hero
// ============================================= //
const switchHero = document.getElementById('switch-hero');

if (!loggedIn) {
  switchHero.innerHTML = `<a href="/login" class="cta-btn--hero">Get Your Dream APP Now!</a>`;
} else {
  switchHero.innerHTML = `<a href="/dashboard" class="cta-btn--hero">Get Your Dream APP Now!</a>`;
}
