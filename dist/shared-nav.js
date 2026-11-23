// Case study navigation uses the same mobile drawer behavior as the homepage.
const systemHeader = document.querySelector('.system-header');
const systemToggle = systemHeader?.querySelector('.menu-toggle');
const systemMenu = systemHeader?.querySelector('.header-menu');

if (systemToggle && systemMenu) {
  const closeMenu = () => {
    systemToggle.setAttribute('aria-expanded', 'false');
    systemToggle.setAttribute('aria-label', 'Open navigation');
    document.documentElement.classList.remove('menu-open');
  };
  systemToggle.addEventListener('click', () => {
    const open = systemToggle.getAttribute('aria-expanded') !== 'true';
    systemToggle.setAttribute('aria-expanded', String(open));
    systemToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.documentElement.classList.toggle('menu-open', open);
  });
  systemMenu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.system-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && systemToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      systemToggle.focus();
    }
  });
  matchMedia('(min-width: 52.01rem)').addEventListener('change', closeMenu);
}
