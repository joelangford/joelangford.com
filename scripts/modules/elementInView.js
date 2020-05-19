export const checkElements = () => {
  const elements = document.querySelectorAll('.js-fade-in');

  elements.forEach($element => {
     if ($element.getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
       $element.classList.add('animate');
     }
  });
};

const elementInView = () => {
  const $body = document.querySelector('body');

  const init = () => {
    $body.classList.add('animations-active');

    checkElements();

    window.addEventListener('scroll', () => {
      checkElements();
    });
  }

  init();
}

export default elementInView;
