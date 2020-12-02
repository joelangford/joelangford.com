import requestHTML from './requestHTML.js';
import parseHTML from './parseHTML.js';
import updateNavigation from './updateNavigation.js';

const removeFirstLoad = (config) => {
  document.querySelectorAll(config.firstLoadSelector).forEach($element => {
    $element.classList.remove(config.firstLoadClass);
  });
}

const updateURL = (targetUrl) => {
  history.pushState(null, null, targetUrl);
}

const hideAllChildren = ($parent, config) => {
  $parent.querySelectorAll(config.pageContentSelector).forEach($child => {
    $child.style.display = 'none';
  });
}

const injectContentHtml = (content, config) => {
  document.querySelector(config.contentContainerSelector).appendChild(content);
}

const toggleLoading = async (config) => {
  const $loadingIndicatorElement = document.querySelector(config.loadingIndicatorElementSelector);

  $loadingIndicatorElement.classList.toggle(config.loadingClass);
  if ($loadingIndicatorElement.classList.contains(config.loadingClass)) {
    setTimeout(() => {
      $loadingIndicatorElement.classList.remove(config.loadingClass);
      document.querySelector(config.siteHeaderSelector).classList.remove(config.navOpenClass);
    }, config.loadingAnimationDelay);
  } else {
    $loadingIndicatorElement.classList.add(config.loadingClass);
  }
}

const initCallbacks = (pageCallbacks) => {
  pageCallbacks();
}

const handleContent = async (
  targetUrl,
  $targetLink,
  pageCallbacks,
  config
) => {
  removeFirstLoad(config);
  let $cachedContent;

  if ($targetLink) {
    updateURL(targetUrl);
    $cachedContent = document.querySelector(`#${$targetLink.getAttribute(config.targetAttributeName)}`);
  }

  hideAllChildren(document.querySelector(config.contentContainerSelector), config);
  toggleLoading(config);

  if ($cachedContent) {
    $cachedContent.style.display = config.visibleDisplayValue;
  } else {
    try {
      const html = await requestHTML(targetUrl);
      const parsedHTML = await parseHTML(html, config.pageContentSelector);
      await injectContentHtml(parsedHTML, config);
    } catch (err) {
      console.error(err);
    }
  }

  if (config.scrollToTop) {
    window.scrollBy({
      top: -document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  updateNavigation(config);
  toggleLoading(config);
  initCallbacks(pageCallbacks);
}

export default handleContent;
