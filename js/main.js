// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  mainNav.classList.toggle('active');
  overlay.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  }
}

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Submenu Toggle
window.toggleSubmenu = function(event) {
  event.preventDefault();
  const parent = event.currentTarget.closest('.has-submenu');
  const submenu = parent.querySelector('.submenu');
  const arrow = parent.querySelector('.arrow');
  submenu.classList.toggle('active');
  arrow.classList.toggle('rotated');
};

// Close menu on link click
document.querySelectorAll('#mainNav ul li a:not(.has-submenu > a)').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('active')) {
      toggleMenu();
    }
  });
});