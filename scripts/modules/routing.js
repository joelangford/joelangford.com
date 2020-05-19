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

  const parseContentHTML = (xml) => {
    const content  = xml.querySelector('.js-page-content');

    if (content) {
      return content;
    }
  }

  const hideAllChildren = ($parent) => {
    const children = $parent.querySelectorAll('.js-page-content');

    children.forEach($child => {
      $child.style.display = 'none';
    });
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

  const updateNavigation = (navLinks) => {
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

  const updateURL = (targetUrl) => {
    history.pushState(null, null, targetUrl);
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
      updateNavigation(navLinks);
    } else {
      requestHTML(targetUrl)
        .then((result) => {
          return parseContentHTML(result);
        }).then((result) => {
          injectContentHtml(result);
          updateNavigation(navLinks);
        })
        // .catch((err) => {
        //   console.error('Error', err.statusText);
        // });
    }

  }

  const handleNavLinks = (navLinks) => {
    navLinks.forEach($navLink => {
      $navLink.addEventListener('click', (e) => {
        e.preventDefault();

        const $targetLink = e.target;
        const targetUrl = $targetLink.getAttribute('href');

        requestContent(targetUrl, $targetLink, navLinks);
      });
    });
  }

  const hanndlePopState = (navLinks) => {
    window.addEventListener('popstate', (e) => {
      const $targetLink = null;
      const targetUrl = e.target.location.href;

      requestContent(targetUrl, null, navLinks);
    });
  }

  const init = () => {
    const navLinks = document.querySelectorAll('.js-nav-link');

    handleNavLinks(navLinks);
    hanndlePopState(navLinks);
  }

  init();
};


export default routing;
