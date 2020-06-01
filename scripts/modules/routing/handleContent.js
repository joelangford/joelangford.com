import requestHTML from './requestHTML.js';
import parseHTML from './parseHTML.js';
import updateNavigation from './updateNavigation.js';

const removeFirstLoad = (
  elements = document.querySelectorAll('.first-load'),
  firstLoadClass = 'first-load'
) => {
  elements.forEach($element => {
    $element.classList.remove(firstLoadClass);
  });
}

const updateURL = (targetUrl) => {
  history.pushState(null, null, targetUrl);
}

const hideAllChildren = (
  $parent,
  children = $parent.querySelectorAll('.js-page-content')
) => {
  children.forEach($child => {
    $child.style.display = 'none';
  });
}

const injectContentHtml = (
  content,
  $contentContainer = document.querySelector('#content')
) => {
  $contentContainer.appendChild(content);
}

const toggleLoading = async (
  $indicatingElement = document.querySelector('body'),
  $siteHeader = document.querySelector('.js-site-header'),
  loadingClassName = 'loading',
  navOpenClassName = 'open'
) => {
  $indicatingElement.classList.toggle(loadingClassName);

  if ($indicatingElement.classList.contains(loadingClassName)) {
    setTimeout(() => {
      $indicatingElement.classList.remove(loadingClassName);
      $siteHeader.classList.remove(navOpenClassName);
    }, 500);
  } else {
    $indicatingElement.classList.add(loadingClassName);
  }
}

const initCallbacks = (pageCallbacks) => {
  pageCallbacks.map(callback  => {callback()});
}

const handleContent = async (
  targetUrl,
  $targetLink,
  pageCallbacks,
  $contentContainer = document.querySelector('#content'),
  targetAttributeName = 'data-content-target',
  pageContentSelector = '.js-page-content',
  visibleDisplayValue = 'block',
) => {
  removeFirstLoad();
  let $cachedContent;

  if ($targetLink) {
    updateURL(targetUrl);
    $cachedContent = document.querySelector(`#${$targetLink.getAttribute(targetAttributeName)}`);
  }

  hideAllChildren($contentContainer);
  toggleLoading();

  if ($cachedContent) {
    $cachedContent.style.display = visibleDisplayValue;
  } else {
    try {
      const html = await requestHTML(targetUrl);
      const parsedHTML = await parseHTML(html, pageContentSelector);
      await injectContentHtml(parsedHTML);
    } catch (err) {
      console.error(err);
    }
  }

  window.scrollBy({
    top: -document.body.scrollHeight,
    behavior: 'smooth'
  });

  updateNavigation();
  toggleLoading();
  initCallbacks(pageCallbacks);
}

export default handleContent;
