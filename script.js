/* =============================================================
   Luxury Decor Qatar — script.js
   -------------------------------------------------------------
   EDITABLE CONFIG: change contact info and the chat button label.
   ============================================================= */
const CONFIG = {
  phone: '+97455224123',             // EDITABLE: main phone
  whatsapp: '97455224123',           // EDITABLE: WhatsApp in international format WITHOUT '+'
  email: 'luxurydecor.qa@gmail.com', // EDITABLE
  chatLabel: "Let's Chat!"           // EDITABLE: desktop chat button text (e.g., 'Love Chat')
};

// Inject contact links + current year
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-phone]').forEach(a => a.href = `tel:${CONFIG.phone}`);
  document.querySelectorAll('[data-whatsapp]').forEach(a => a.href = `https://wa.me/${CONFIG.whatsapp}`);
  document.querySelectorAll('[data-email]').forEach(a => a.href = `mailto:${CONFIG.email}`);
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
  const chatFab = document.getElementById('chatFab'); if (chatFab) chatFab.textContent = CONFIG.chatLabel;
});

/* DO NOT EDIT: Mobile menu behavior */
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
openMenu?.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu?.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* DO NOT EDIT: Chat modal behavior */
const chatToggle = document.getElementById('chatToggle');
const chatFab = document.getElementById('chatFab');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
function openChat(){ chatBox.classList.add('open'); chatBox.setAttribute('aria-hidden','false'); }
function closeChat(){ chatBox.classList.remove('open'); chatBox.setAttribute('aria-hidden','true'); }
chatToggle?.addEventListener('click', openChat);
chatFab?.addEventListener('click', openChat);
chatClose?.addEventListener('click', closeChat);

/* Simple mailto submit so no server is required */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(contactForm);
  const subject = encodeURIComponent('Callback Request — Luxury Decor Qatar');
  const body = encodeURIComponent(
    `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\n\nMessage:\n${fd.get('message')}`
  );
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  alert('Thanks! Your email window should open. If it does not, email us directly.');
});

/* Back-to-top */
document.getElementById('toTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
