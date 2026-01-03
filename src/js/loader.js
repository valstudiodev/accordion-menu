"use strict"

export function initLoadPage() {
   initPageLoader()
   initAnimationObserver()
}

/**
 * 1. Функція ініціалізації анімацій (Observer)
 */
function initAnimationObserver() {
   // Шукаємо всі елементи, клас яких містить "--anim"
   const elements = document.querySelectorAll('[class*="--anim"]');

   const observerOptions = {
      threshold: 0.15
   };

   const callback = (entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const el = entry.target;
            const children = el.querySelectorAll('.anim-child');
            const delay = parseInt(el.dataset.delay) || 0;
            const step = parseInt(el.dataset.step) || 150;

            if (children.length > 0) {
               children.forEach((child, index) => {
                  setTimeout(() => {
                     child.classList.add('animate');
                  }, delay + (index * step));
               });
            } else {
               setTimeout(() => {
                  el.classList.add('animate');
               }, delay);
            }
            observer.unobserve(el);
         }
      });
   };

   const observer = new IntersectionObserver(callback, observerOptions);
   elements.forEach(el => observer.observe(el));
}

/**
 * 2. Функція завантаження сторінки (Loader)
 */
function initPageLoader(delay = 600, barColor = '#ff4500') {
   const loaderTarget = document.querySelector('[init-page-loader]');
   if (!loaderTarget) return;

   const progressBar = document.createElement('div');
   progressBar.id = 'loader-progress-bar';

   const barStyle = document.createElement('style');
   barStyle.innerHTML = `
        #loader-progress-bar {
            position: fixed; top: 0; left: 0; height: 3px;
            background-color: ${barColor}; z-index: 100000;
            width: 0%; transition: width 0.4s ease, opacity 0.3s ease;
            box-shadow: 0 0 10px ${barColor};
        }
    `;
   document.head.appendChild(barStyle);
   document.documentElement.appendChild(progressBar);

   let progress = 0;
   const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
   }, 150);

   const showPage = () => {
      if (loaderTarget.getAttribute('init-page-loader') === 'ready') return;

      clearInterval(interval);
      progressBar.style.width = '100%';

      setTimeout(() => {
         // 1. Встановлюємо статус ready (для твоїх SCSS стилів)
         loaderTarget.setAttribute('init-page-loader', 'ready');

         // 2. ВАЖЛИВО: Запускаємо обсервер анімацій саме тут!
         initAnimationObserver();

         setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 400);
         }, 300);
      }, delay);
   };

   window.addEventListener('load', showPage);
   setTimeout(showPage, 4000);
}

// Запуск
initPageLoader(600, '#ff4500');
