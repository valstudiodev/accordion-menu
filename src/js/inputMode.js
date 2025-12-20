"use strict"

// ===========================================================================================
// -----------------------------
// ВИЗНАЧЕННЯ ТИПУ ВВОДУ (Input Mode)
// -----------------------------
export function initInputMode() {
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
