export const checkElements = (
  animateClassName = 'animate',
  fadeInElementsClassName = '.js-fade-in'
) => {
  const elements = document.querySelectorAll(fadeInElementsClassName);

  elements.forEach($element => {
     if ($element.getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
       $element.classList.add(animateClassName);
     }
  });
};

export const elementInView = (
  animationsActiveClassName = 'animations-active',
  $body = document.querySelector('body')
) => {
  $body.classList.add(animationsActiveClassName);
  checkElements();

  window.addEventListener('scroll', () => {
    checkElements();
  });
}
