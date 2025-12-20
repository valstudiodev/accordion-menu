"use strict"

// ===========================================================================================
// -----------------------------
// ЛОГІКА ВИПАДАЮЧИХ МЕНЮ (Dropdowns)
// -----------------------------
export function initDropdowns() {
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
