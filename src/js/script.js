"use strict"

import { initInputMode } from './inputMode';
import { initDropdowns } from './dropdown';

// ===========================================================================================
// -----------------------------
// ГОЛОВНИЙ ЗАПУСК
// -----------------------------
function initApp() {
   initInputMode();
   initDropdowns();
}

if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initApp);
} else {
   initApp();
}



// ===========================================================================================
// -----------------------------
// accordions
// -----------------------------
const accordions = document.querySelectorAll('[data-accordion]');
const mq = window.matchMedia('(max-width: 581px)');

function setupAccordions() {
   accordions.forEach(item => {
      const btn = item.querySelector('[data-accordion-btn]');
      const body = item.querySelector('[data-accordion-body]');
      if (!btn || !body) return;

      if (!mq.matches) {
         item.classList.remove('active');
         body.style.height = '';
         return;
      }

      body.style.height = item.classList.contains('active')
         ? body.scrollHeight + 'px'
         : '0px';

      btn.onclick = () => {
         const isOpen = item.classList.contains('active');

         if (isOpen) {
            body.style.height = body.scrollHeight + 'px';
            requestAnimationFrame(() => body.style.height = '0px');
            item.classList.remove('active');
         } else {
            item.classList.add('active');
            body.style.height = body.scrollHeight + 'px';

            body.addEventListener('transitionend', () => {
               body.style.height = 'auto';
            }, { once: true });
         }
      };
   });
}

setupAccordions();
mq.addEventListener('change', setupAccordions);





// ===========================================================================================
// -----------------------------
// MENU-BURGER
// -----------------------------
function documentActions(e) {
   const targetElement = e.target
   if (targetElement.closest('.icon-menu')) {
      document.body.classList.toggle('menu-open')
      document.body.classList.toggle('scroll-lock')
      document.documentElement.classList.toggle('menu-open')
   }
}


