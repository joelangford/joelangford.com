const updateNavigation = (config) => {
  document.querySelectorAll(config.navLinksSelector).forEach($navLink => {
    document.querySelectorAll(config.contentAreasSelector).forEach($contentArea => {
      if ($contentArea.style.display !== 'none') {
        if ($contentArea.getAttribute('id') === $navLink.getAttribute(config.targetAttributeName)) {
          $navLink.classList.add(config.activeClass);
        } else {
          $navLink.classList.remove(config.activeClass);
        }
      }
    });
  });
}

export default updateNavigation;
