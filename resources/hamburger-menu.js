'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#mobile-nav .icon');
  const menu = document.getElementById('myLinks');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('nav-open');
    menu.classList.toggle('nav-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});
