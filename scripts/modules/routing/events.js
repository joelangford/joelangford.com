import handleContent from './handleContent.js';

export const popstateEvents = () => {
  window.addEventListener('popstate', (e) => {
    const $targetLink = null;
    const targetUrl = e.target.location.href;

    handleContent(targetUrl, null, pageCallbacks);
  });
}

export const navLinkEvents = (
  pageCallbacks,
  navLinks = document.querySelectorAll('.js-nav-link'),
) => {
  navLinks.forEach($navLink => {
    $navLink.addEventListener('click', (e) => {
      e.preventDefault();

      const $targetLink = e.target;
      const targetUrl = $targetLink.getAttribute('href');

      handleContent(targetUrl, $targetLink, pageCallbacks);
    });
  });
}

export const navToggleEvent = (
  pageCallbacks,
  $navToggleBtn = document.querySelector('.js-nav-toggle'),
  $siteHeader = document.querySelector('.js-site-header'),
  openClassName = 'open'
) => {
  if ($navToggleBtn && $siteHeader) {
    $navToggleBtn.addEventListener('click', () => {
      $siteHeader.classList.toggle(openClassName);
    });
  }
}
