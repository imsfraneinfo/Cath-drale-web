// Main site functionality
console.log('🏔️ Imsfrane Cathédrale - Montagne Sacrée de l\'Atlas');
console.log('📍 Imsfrane Tilouguite, Azilal, Maroc');
console.log('📞 Contact: 06 67 77 25 51');

// Site information
const siteInfo = {
  name: 'Imsfrane Cathédrale',
  altitude: '1 868m',
  location: 'Tilouguite, Azilal',
  phone: '0667772551',
  whatsapp: 'https://wa.me/212667772551',
  rib: '022780000760004191778274'
};

// Utility functions
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatPrice(price) {
  return price + ' DH';
}

function copyRIB() {
  navigator.clipboard.writeText(siteInfo.rib).then(() => {
    alert('✅ RIB copié : ' + siteInfo.rib);
  });
}

// Export to console
window.imsfrane = {
  info: siteInfo,
  scrollToTop: scrollToTop,
  formatPrice: formatPrice,
  copyRIB: copyRIB
};

console.log('✅ Site chargé avec succès');