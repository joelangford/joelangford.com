const navToggle = () => {
  const $navToggleBtn = document.querySelector('.js-nav-toggle');
  const $siteHeader = document.querySelector('.js-site-header');

  if ($navToggleBtn) {
    $navToggleBtn.addEventListener('click', () => {
      $siteHeader.classList.toggle('open');
    });
  }
}

export default navToggle;
