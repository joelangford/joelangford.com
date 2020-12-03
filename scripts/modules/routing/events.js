import handleContent from './handleContent.js';

export const popstateEvents = (config) => {
  window.addEventListener('popstate', (e) => {
    const targetUrl = e.target.location.href;

    handleContent(targetUrl, null, pageCallbacks, config);
  });
}

export const navLinkEvents = (pageCallbacks, config) => {
  document.querySelectorAll(config.navLinksSelector).forEach($navLink => {
    $navLink.addEventListener('click', (e) => {
      e.preventDefault();

      const $targetLink = e.target;
      const targetUrl = $targetLink.getAttribute('href');

      handleContent(targetUrl, $targetLink, pageCallbacks, config);
    });
  });
}

export const navToggleEvent = (config) => {
  const $navToggleBtn = document.querySelector(config.navToggleBtnSelector),
    $siteHeader = document.querySelector(config.siteHeaderSelector);

  if ($navToggleBtn && $siteHeader) {
    $navToggleBtn.addEventListener('click', () => {
      $siteHeader.classList.toggle(config.navOpenClass);
    });
  }
}
