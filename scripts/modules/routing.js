import checkElements from './elementInView.js';

const routing = () => {
  const requestHTML = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseXML);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      }

      xhr.open("GET", url);
      xhr.responseType = "document";
      xhr.send();
    });
  }

  const parseHTML = (xml, selector) => {
    const content  = xml.querySelector(selector);

    if (content) {
      return content;
    }
  }

  const updateURL = (targetUrl) => {
    history.pushState(null, null, targetUrl);
  }

  const hanndlePopState = (navLinks) => {
    window.addEventListener('popstate', (e) => {
      const $targetLink = null;
      const targetUrl = e.target.location.href;

      requestContent(targetUrl, null, navLinks);
    });
  }

  const hideAllChildren = ($parent) => {
    const children = $parent.querySelectorAll('.js-page-content');

    children.forEach($child => {
      $child.style.display = 'none';
    });
  }

  const injectHeaderHtml = (content) => {
    const $contentContainer = document.querySelector('body');
    $contentContainer.prepend(content);
  }

  const injectContentHtml = (content) => {
    const $contentContainer = document.querySelector('#content');

    const contentCached = $contentContainer.querySelector(`#${content.getAttribute('id')}`);
    hideAllChildren($contentContainer);

    if (contentCached) {
      contentCached.style.display = 'block';
    } else {
      $contentContainer.appendChild(content);
      checkElements();
    }
  }

  const updateNavigation = () => {
    const navLinks = document.querySelectorAll('.js-nav-link');
    const contentAreas = document.querySelectorAll('.js-page-content');
    navLinks.forEach($navLink => {
      contentAreas.forEach($contentArea => {
        if ($contentArea.style.display !== 'none') {
          if ($contentArea.getAttribute('id') === $navLink.getAttribute('data-content-target')) {
            $navLink.classList.add('active');
          } else {
            $navLink.classList.remove('active');
          }
        }
      });
    });
  }

  const removeFirstLoad = () => {
    const elements = document.querySelectorAll('.first-load');

    elements.forEach($element => {
      $element.classList.remove('first-load');
    });
  }

  const requestContent = (targetUrl, $targetLink, navLinks) => {
    removeFirstLoad();
    let $cachedContent;

    if ($targetLink) {
      updateURL(targetUrl);
      $cachedContent = document.querySelector(`#${$targetLink.getAttribute('data-content-target')}`);
    }

    if ($cachedContent) {
      const $contentContainer = document.querySelector('#content');

      hideAllChildren($contentContainer);

      $cachedContent.style.display = 'block';
      updateNavigation();
    } else {
      requestHTML(targetUrl)
        .then((result) => {
          return parseHTML(result, '.js-page-content');
        }).then((result) => {
          injectContentHtml(result);
          updateNavigation();
        })
        .catch((err) => {
          console.error('Error', err.statusText);
        });
    }
  }

  const handleNavLinks = () => {
    const navLinks = document.querySelectorAll('.js-nav-link');

    navLinks.forEach($navLink => {
      $navLink.addEventListener('click', (e) => {
        e.preventDefault();

        const $targetLink = e.target;
        const targetUrl = $targetLink.getAttribute('href');

        requestContent(targetUrl, $targetLink, navLinks);
      });
    });
  }

  const handleHeader = () => {
    return new Promise((resolve, reject) => {
      const siteHeaderSeletor = '.js-site-header';
      const $siteHeader =  document.querySelector(siteHeaderSeletor);

      if (!$siteHeader) {
        requestHTML('/').then((result) => {
          return parseHTML(result, siteHeaderSeletor);
        }).then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err.statusText);
        });
      } else {
        resolve();
      }
    });
  }

  const init = () => {
    handleHeader().then((result) => {
      injectHeaderHtml(result);
      handleNavLinks();
      updateNavigation();
    }).catch((errorText) => {
        console.error('Error', errorText);
    });
    hanndlePopState();
  }

  init();
};

export default routing;
