const updateNavigation = (
  navLinks = document.querySelectorAll('.js-nav-link'),
  contentAreas = document.querySelectorAll('.js-page-content'),
  targetAttributeName = 'data-content-target',
  activeClass = 'active'
) => {
  navLinks.forEach($navLink => {
    contentAreas.forEach($contentArea => {
      if ($contentArea.style.display !== 'none') {
        if ($contentArea.getAttribute('id') === $navLink.getAttribute(targetAttributeName)) {
          $navLink.classList.add(activeClass);
        } else {
          $navLink.classList.remove(activeClass);
        }
      }
    });
  });
}

export default updateNavigation;
