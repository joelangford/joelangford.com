const elementInView = () => {
  const elements = document.querySelectorAll('.js-fade-in');
  const $body = document.querySelector('body');

  const checkElements = () => {
    elements.forEach($element => {
       if ($element.getBoundingClientRect().top - document.documentElement.clientHeight < 0) {
         $element.classList.add('animate');
       }
    });
  };

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
