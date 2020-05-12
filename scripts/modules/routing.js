const routing = () => {

  const requestHTML = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseXML);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      }

      xhr.open("GET", url);
      xhr.responseType = "document";
      xhr.send();
    });
  }

  const init = () => {
    const navLinks = document.querySelectorAll('.js-nav-link');

    navLinks.forEach($navLink => {
      $navLink.addEventListener('click', (e) => {
        e.preventDefault();

        const targetUrl = e.target.getAttribute('href');

        requestHTML(targetUrl)
          .then((result) => {
            console.log(result);

          })
          .catch((err) => {
            console.error('Error', err.statusText);
          });
      });
    });
  }

  init();
};


export default routing;
