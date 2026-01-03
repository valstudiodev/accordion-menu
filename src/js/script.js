"use strict"

import { initInputMode } from './inputMode';
import { initDropdowns } from './dropdown';
import { initLoadPage } from './loader';

// ===========================================================================================
// -----------------------------
// ГОЛОВНИЙ ЗАПУСК
// -----------------------------
function initApp() {
   initInputMode()
   initDropdowns()
   initLoadPage()
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
document.addEventListener('click', (e) => {
   const btn = e.target.closest('[data-accordion-btn]');
   if (!btn) return;

   const accordionParent = btn.closest('[data-accordion]');
   if (!accordionParent) return;

   const body = accordionParent.querySelector('[data-accordion-body]');
   const icon = btn.querySelector('[data-accordion-icon]');
   if (!body) return;

   const isOpen = accordionParent.classList.contains('active');

   if (!isOpen) {
      accordionParent.classList.add('active');
      if (icon) icon.classList.add('icon-active');

      body.style.height = body.scrollHeight + 'px';

      body.addEventListener(
         'transitionend',
         () => {
            if (accordionParent.classList.contains('active')) {
               body.style.height = 'auto';
            }
         },
         { once: true }
      );
   } else {
      body.style.height = body.scrollHeight + 'px';
      body.offsetHeight;

      requestAnimationFrame(() => {
         accordionParent.classList.remove('active');
         if (icon) icon.classList.remove('icon-active');
         body.style.height = '0px';
      });
   }
});





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


