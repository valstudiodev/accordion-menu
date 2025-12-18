"use strict"

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
// ВИЗНАЧЕННЯ ТИПУ ВВОДУ (Input Mode)
// -----------------------------
function initInputMode() {
   const html = document.documentElement;
   let lockedByKeyboard = false;

   // const set = (type) => {
   //    if (html.dataset.input !== type) {
   //       html.dataset.input = type;
   //    }
   // };

   function setInputMode(type) {
      html.dataset.input = type;
   }

   const isTouchInitial = window.matchMedia('(pointer: coarse)').matches;
   setInputMode(isTouchInitial ? 'touch' : 'mouse');

   window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
         lockedByKeyboard = true;
         setInputMode('keyboard');
      }
   });

   window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse' && !lockedByKeyboard) {
         setInputMode('mouse');
      }
   }, { passive: true });

   window.addEventListener('pointerdown', (e) => {
      lockedByKeyboard = false;
      setInputMode(e.pointerType);
   });
}

// ===========================================================================================
// -----------------------------
// ЛОГІКА ВИПАДАЮЧИХ МЕНЮ (Dropdowns)
// -----------------------------
function initDropdowns() {
   const html = document.documentElement;
   const menuItems = document.querySelectorAll('.menu-dropdown__item--submenu');

   const closeAllMenus = () => {
      menuItems.forEach((item) => item.classList.remove('is-active'));
   };

   menuItems.forEach((item) => {
      const link = item.querySelector('.menu-dropdown__link');

      // 1. Обробка кліку (Touch)
      item.addEventListener('click', (e) => {
         if (html.dataset.input === 'touch' || html.dataset.input === 'pen') {
            if (e.target.closest('.menu-dropdown__link')) {
               e.preventDefault();
               menuItems.forEach((el) => {
                  if (el !== item) el.classList.remove('is-active');
               });
               item.classList.toggle('is-active');
            }
         }
      });

      // 2. ДОДАНО: Обробка фокусу (Tab)
      // Коли посилання всередині item отримує фокус — показуємо меню
      item.addEventListener('focusin', () => {
         if (html.dataset.input === 'keyboard') {
            item.classList.add('is-active');
         }
      });

      // 3. Обробка виходу фокусу (Tab виходить за межі)
      item.addEventListener('focusout', (e) => {
         // Якщо новий елемент фокусу (relatedTarget) НЕ всередині поточного item — закриваємо
         if (!item.contains(e.relatedTarget)) {
            item.classList.remove('is-active');
         }
      });
   });

   // Закриття при кліку поза меню
   document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-dropdown__item--submenu')) {
         closeAllMenus();
      }
   });

   // Закриття при Escape
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
         closeAllMenus();
         if (html.dataset.input === 'keyboard') {
            document.activeElement.blur();
         }
      }
   });
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


