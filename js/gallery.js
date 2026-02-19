// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('h3')?.textContent || 'Imsfrane Cathédrale';
      
      // Create modal
      const modal = document.createElement('div');
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            `;
      
      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 0 50px rgba(255,255,255,0.1);
            `;
      
      const caption = document.createElement('div');
      caption.textContent = title;
      caption.style.cssText = `
                position: absolute;
                bottom: 30px;
                left: 0;
                width: 100%;
                text-align: center;
                color: white;
                font-size: 18px;
                font-family: 'Cormorant Garamond', serif;
            `;
      
      modal.appendChild(modalImg);
      modal.appendChild(caption);
      
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      document.body.appendChild(modal);
    });
  });
});