import checkElements from '../elementInView.js';
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
  checkElements();
}

const handleContent = async (
  targetUrl,
  $targetLink,
  $contentContainer = document.querySelector('#content'),
  targetAttributeName = 'data-content-target',
  pageContentSelector = '.js-page-content',
  visibleDisplayValue = 'block'
) => {
  removeFirstLoad();
  let $cachedContent;

  if ($targetLink) {
    updateURL(targetUrl);
    $cachedContent = document.querySelector(`#${$targetLink.getAttribute(targetAttributeName)}`);
  }

  hideAllChildren($contentContainer);

  if ($cachedContent) {
    $cachedContent.style.display = visibleDisplayValue;
    updateNavigation();
  } else {
    try {
      const html = await requestHTML(targetUrl);
      const parsedHTML = await parseHTML(html, pageContentSelector);
      await injectContentHtml(parsedHTML);
      updateNavigation();
    } catch (err) {
      console.error(err);
    }
  }
}

export default handleContent;
