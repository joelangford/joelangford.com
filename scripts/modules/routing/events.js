import handleContent from './handleContent.js';

export const popstateEvents = () => {
  window.addEventListener('popstate', (e) => {
    const $targetLink = null;
    const targetUrl = e.target.location.href;

    handleContent(targetUrl, null);
  });
}

export const navLinkEvents = (
  navLinks = document.querySelectorAll('.js-nav-link'),
) => {
  navLinks.forEach($navLink => {
    $navLink.addEventListener('click', (e) => {
      e.preventDefault();

      const $targetLink = e.target;
      const targetUrl = $targetLink.getAttribute('href');

      handleContent(targetUrl, $targetLink);
    });
  });
}
