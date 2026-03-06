// Language Switcher
window.setLanguage = function(lang) {
  document.body.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang.toLowerCase());
  });
  localStorage.setItem('preferred-language', lang);
};

// Load saved language
const savedLang = localStorage.getItem('preferred-language');
if (savedLang) {
  setLanguage(savedLang);
} else {
  setLanguage('en');
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

window.changeSlide = function(direction) {
  showSlide(currentSlide + direction);
};

window.goToSlide = function(index) {
  showSlide(index);
};

// Auto advance slides
setInterval(() => {
  changeSlide(1);
}, 5000);
