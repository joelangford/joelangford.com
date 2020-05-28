const navToggle = (
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

export default navToggle;
