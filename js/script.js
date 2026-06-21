/* ============================================
   IMSFRANE CATHÉDRALE - SCRIPT UNIFIED
   Version: 1.0
   ============================================ */

// ============================================
// 1. LANGUAGE SWITCHER
// ============================================
window.setLanguage = function(lang) {
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang.toLowerCase());
    });
    localStorage.setItem('preferred-language', lang);
};

// Load saved language
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage('en');
    }
});

// ============================================
// 2. MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    if (!mainNav || !overlay) return;
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    const icon = menuToggle ? menuToggle.querySelector('i') : null;
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}
if (overlay) {
    overlay.addEventListener('click', toggleMenu);
}

// ============================================
// 3. SUBMENU TOGGLE
// ============================================
window.toggleSubmenu = function(event) {
    event.preventDefault();
    const parent = event.currentTarget.closest('.has-submenu');
    if (!parent) return;
    const submenu = parent.querySelector('.submenu');
    const arrow = parent.querySelector('.arrow');
    if (submenu) submenu.classList.toggle('active');
    if (arrow) arrow.classList.toggle('rotated');
};

// Close menu on link click
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#mainNav ul li a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// ============================================
// 4. BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 5. HERO SLIDER (Index Page)
// ============================================
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slider .slide');
const heroDots = document.querySelectorAll('.hero-slider .dot');
const totalHeroSlides = heroSlides.length;

function showHeroSlide(index) {
    if (index < 0) index = totalHeroSlides - 1;
    if (index >= totalHeroSlides) index = 0;
    
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentSlide = index;
}

window.changeSlide = function(direction) {
    showHeroSlide(currentSlide + direction);
};

window.goToSlide = function(index) {
    showHeroSlide(index);
};

// Auto advance hero slider
if (heroSlides.length > 0) {
    setInterval(() => {
        showHeroSlide(currentSlide + 1);
    }, 5000);
}

// ============================================
// 6. PROGRAMME SLIDER (Programme Page)
// ============================================
const programmeSliders = {};

function initProgrammeSlider(sliderId, totalSlides) {
    const wrapper = document.querySelector(`#${sliderId} .slider-wrapper`);
    const dots = document.querySelectorAll(`#${sliderId} .slider-dot`);
    
    if (!wrapper || dots.length === 0) return;
    
    programmeSliders[sliderId] = {
        current: 0,
        total: totalSlides,
        wrapper: wrapper,
        dots: dots
    };
}

function updateProgrammeSlider(sliderId, newIndex) {
    const slider = programmeSliders[sliderId];
    if (!slider) return;
    
    let index = newIndex % slider.total;
    if (index < 0) index = slider.total - 1;
    
    slider.current = index;
    slider.wrapper.style.transition = 'transform 0.5s ease';
    slider.wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    slider.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

window.moveSlide = function(direction, sliderId) {
    if (programmeSliders[sliderId]) {
        updateProgrammeSlider(sliderId, programmeSliders[sliderId].current + direction);
    }
};

window.goToProgrammeSlide = function(index, sliderId) {
    updateProgrammeSlider(sliderId, index);
};

// Initialize programme sliders
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#slider1')) {
        initProgrammeSlider('slider1', 3);
        initProgrammeSlider('slider2', 3);
        initProgrammeSlider('slider3', 2);
        
        // Auto advance programme sliders
        setInterval(() => {
            if (programmeSliders['slider1']) updateProgrammeSlider('slider1', programmeSliders['slider1'].current + 1);
            if (programmeSliders['slider2']) updateProgrammeSlider('slider2', programmeSliders['slider2'].current + 1);
            if (programmeSliders['slider3']) updateProgrammeSlider('slider3', programmeSliders['slider3'].current + 1);
        }, 5000);
    }
});

// ============================================
// 7. BLOG ARTICLE TOGGLE
// ============================================
window.toggleArticle = function(index) {
    const fullArticle = document.getElementById('full-' + index);
    if (!fullArticle) return;
    
    fullArticle.classList.toggle('show');
    
    // Get the button from the event
    const btn = window.event ? window.event.target.closest('.blog-link') : null;
    if (btn) {
        const spanEn = btn.querySelector('.lang-en');
        const spanFr = btn.querySelector('.lang-fr');
        if (fullArticle.classList.contains('show')) {
            if (spanEn) spanEn.textContent = 'Read less';
            if (spanFr) spanFr.textContent = 'Lire moins';
        } else {
            if (spanEn) spanEn.textContent = 'Read more';
            if (spanFr) spanFr.textContent = 'Lire plus';
        }
    }
};

// ============================================
// 8. FAQ TOGGLE (Contact Page)
// ============================================
window.toggleFAQ = function(element) {
    if (!element) return;
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    if (answer) answer.classList.toggle('show');
    if (icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }
};

// ============================================
// 9. CONTACT FORM (Contact Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const successMsg = document.getElementById('successMessage');
            const errorMsg = document.getElementById('errorMessage');
            
            if (successMsg) successMsg.style.display = 'none';
            if (errorMsg) errorMsg.style.display = 'none';
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    form.reset();
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => successMsg.style.display = 'none', 5000);
                    }
                } else {
                    if (errorMsg) {
                        errorMsg.style.display = 'block';
                        setTimeout(() => errorMsg.style.display = 'none', 5000);
                    }
                }
            } catch (error) {
                if (errorMsg) {
                    errorMsg.style.display = 'block';
                    setTimeout(() => errorMsg.style.display = 'none', 5000);
                }
            }
        });
    }
});

// ============================================
// 10. BOOKING PAGE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Payment selection
    let modePaiement = 'paypal';
    let total = 0;

    window.selectPayment = function(mode) {
        modePaiement = mode;
        const optionPaypal = document.getElementById('option-paypal');
        const optionVirement = document.getElementById('option-virement');
        const bankInfo = document.getElementById('bankInfo');
        
        if (optionPaypal) optionPaypal.classList.remove('selected');
        if (optionVirement) optionVirement.classList.remove('selected');
        if (bankInfo) bankInfo.classList.remove('active');
        
        if (mode === 'paypal') {
            if (optionPaypal) optionPaypal.classList.add('selected');
        } else {
            if (optionVirement) optionVirement.classList.add('selected');
            if (bankInfo) bankInfo.classList.add('active');
        }
    };

    function calculerTotal() {
        total = 0;
        let checkboxes = document.querySelectorAll('.activity-checkbox:checked');
        let personnes = parseInt(document.getElementById('personnes')?.value) || 1;
        let nuits = parseInt(document.getElementById('nuits')?.value) || 1;
        
        checkboxes.forEach(cb => {
            let prix = parseFloat(cb.getAttribute('data-prix')) || 0;
            let type = cb.getAttribute('data-type') || '';
            
            if (type === 'nuit') {
                total += prix * nuits;
            } else if (type === 'groupe') {
                total += prix;
            } else if (type === 'heure') {
                total += prix;
            } else {
                total += prix * personnes;
            }
        });
        
        const totalAffiche = document.getElementById('totalAffiche');
        if (totalAffiche) totalAffiche.textContent = total + ' DH';
    }

    function checkNightsField() {
        let checkboxes = document.querySelectorAll('.activity-checkbox:checked');
        let hasNuit = false;
        
        checkboxes.forEach(cb => {
            if (cb.getAttribute('data-type') === 'nuit') {
                hasNuit = true;
            }
        });
        
        const nuitsGroup = document.getElementById('groupe-nuits');
        if (nuitsGroup) {
            nuitsGroup.style.display = hasNuit ? 'block' : 'none';
        }
        calculerTotal();
    }

    // Event listeners for booking page
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        document.querySelectorAll('.activity-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                calculerTotal();
                checkNightsField();
            });
        });

        const personnesInput = document.getElementById('personnes');
        if (personnesInput) {
            personnesInput.addEventListener('change', calculerTotal);
        }

        const nuitsInput = document.getElementById('nuits');
        if (nuitsInput) {
            nuitsInput.addEventListener('change', calculerTotal);
        }

        // Initialize booking page
        if (document.getElementById('option-paypal')) {
            selectPayment('paypal');
        }
        
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
        
        calculerTotal();
        checkNightsField();

        // Submit button
        const btnConfirmer = document.getElementById('btn-confirmer');
        if (btnConfirmer) {
            btnConfirmer.addEventListener('click', function() {
                let checkboxes = document.querySelectorAll('.activity-checkbox:checked');
                if (checkboxes.length === 0) {
                    alert('Veuillez choisir au moins une activité.');
                    return;
                }
                
                let date = document.getElementById('date')?.value;
                if (!date) {
                    alert('Veuillez choisir une date.');
                    return;
                }

                let fullName = document.getElementById('fullName')?.value;
                if (!fullName) {
                    alert('Veuillez entrer votre nom.');
                    return;
                }

                let email = document.getElementById('email')?.value;
                if (!email) {
                    alert('Veuillez entrer votre email.');
                    return;
                }

                let phone = document.getElementById('phone')?.value;
                if (!phone) {
                    alert('Veuillez entrer votre téléphone.');
                    return;
                }
                
                let personnes = document.getElementById('personnes')?.value || 1;
                let nuits = document.getElementById('nuits')?.value || 1;
                let mode = modePaiement;
                
                let message = `*NOUVELLE DEMANDE DE RÉSERVATION*\n\n`;
                message += `👤 *Nom:* ${fullName}\n`;
                message += `📧 *Email:* ${email}\n`;
                message += `📞 *Téléphone:* ${phone}\n`;
                message += `📅 *Date souhaitée:* ${date}\n`;
                message += `👥 *Nombre de personnes:* ${personnes}\n`;
                
                let hasNuit = false;
                checkboxes.forEach(cb => {
                    if (cb.getAttribute('data-type') === 'nuit') hasNuit = true;
                });
                if (hasNuit) {
                    message += `🏠 *Nombre de nuits:* ${nuits}\n`;
                }
                
                message += `\n📋 *ACTIVITÉS CHOISIES:*\n`;
                
                checkboxes.forEach(cb => {
                    let nom = cb.getAttribute('data-nom');
                    let prix = cb.getAttribute('data-prix');
                    message += `- ${nom} : ${prix} DH\n`;
                });
                
                message += `\n💰 *Montant total estimé:* ${total} DH\n\n`;
                message += `💳 *Mode de paiement souhaité:* ${mode === 'paypal' ? 'PayPal' : 'Virement bancaire'}\n\n`;
                message += `📍 *Maisons situées à Tilouguite (10km avant Imsfrane)*\n`;
                message += `📌 *Merci de nous contacter pour confirmer les prix et la disponibilité.*`;

                window.open(`https://wa.me/212667772551?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
    }
});

// ============================================
// 11. MEMORIES GALLERY (Memories Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    window.openModal = function(index) {
        if (!modal || !modalImg) return;
        currentIndex = index;
        modalImg.src = galleryItems[currentIndex].src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.changeImage = function(direction) {
        if (!modalImg || galleryItems.length === 0) return;
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = galleryItems.length - 1;
        if (currentIndex >= galleryItems.length) currentIndex = 0;
        modalImg.src = galleryItems[currentIndex].src;
    };

    if (modal) {
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        });
    }
});

// ============================================
// 12. PROGRAMME CALCULATOR (Programme Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const raftingCheck = document.getElementById('rafting');
    const vttCheck = document.getElementById('vtt');
    const quadCheck = document.getElementById('quad');
    const totalDisplay = document.getElementById('total');

    if (raftingCheck || vttCheck || quadCheck) {
        window.calculerTotal = function() {
            let total = 860;
            if (raftingCheck && raftingCheck.checked) total += 400;
            if (vttCheck && vttCheck.checked) total += 150;
            if (quadCheck && quadCheck.checked) total += 250;
            if (totalDisplay) totalDisplay.textContent = total + ' DH';
        };

        if (raftingCheck) raftingCheck.addEventListener('change', window.calculerTotal);
        if (vttCheck) vttCheck.addEventListener('change', window.calculerTotal);
        if (quadCheck) quadCheck.addEventListener('change', window.calculerTotal);
        
        window.calculerTotal();
    }
});

// ============================================
// 13. IMAGE OBJECT-POSITION FIX (Index Cards)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Force object-position on all cards
    const cards = document.querySelectorAll('.activities-grid-promax .activity-card-promax .card-media-promax img');
    cards.forEach((img, index) => {
        if (index === 0) img.style.objectPosition = '50% 65%';
        else if (index === 1) img.style.objectPosition = '50% 70%';
        else if (index === 2) img.style.objectPosition = '50% 30%';
        else if (index === 3) img.style.objectPosition = '50% 50%';
        else if (index === 4) img.style.objectPosition = '50% 85%';
        else if (index === 5) img.style.objectPosition = '50% 70%';
    });
});

console.log('✅ Imsfrane Cathédrale - Script chargé avec succès!');
// ============================================
// RAFTING PAGE - TOGGLE PROGRAMME DETAIL
// ============================================
function toggleProgramme(id, btn) {
    const element = document.getElementById(id);
    if (!element) return;
    
    element.classList.toggle('show');
    
    const spanEn = btn.querySelector('.lang-en');
    const spanFr = btn.querySelector('.lang-fr');
    
    if (element.classList.contains('show')) {
        if (spanEn) spanEn.textContent = '📖 Read less';
        if (spanFr) spanFr.textContent = '📖 Lire moins';
    } else {
        if (spanEn) spanEn.textContent = '📖 Read more';
        if (spanFr) spanFr.textContent = '📖 Lire plus';
    }
}
// ============================================
// RAFTING PAGE - TOGGLE PROGRAMME DETAIL
// ============================================
function toggleRaftingProgramme(id, btn) {
    const element = document.getElementById(id);
    if (!element) return;
    
    element.classList.toggle('show');
    
    const spanEn = btn.querySelector('.lang-en');
    const spanFr = btn.querySelector('.lang-fr');
    
    if (element.classList.contains('show')) {
        if (spanEn) spanEn.textContent = '📖 Hide Program';
        if (spanFr) spanFr.textContent = '📖 Masquer le Programme';
    } else {
        if (spanEn) spanEn.textContent = '📖 View Full Program';
        if (spanFr) spanFr.textContent = '📖 Voir le Programme';
    }
}