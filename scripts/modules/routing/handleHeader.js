import requestHTML from './requestHTML.js';
import parseHTML from './parseHTML.js';

const injectHeaderHtml = (
  content,
  $contentContainer = document.querySelector('body')
) => {
  $contentContainer.prepend(content);
}

const handleHeader = async (config) => {
  const $siteHeader =  document.querySelector(config.siteHeaderSelector);

  if (!$siteHeader) {
    try {
      const html = await requestHTML('/');
      const parsedHTML = await parseHTML(html, config.siteHeaderSelector);
      injectHeaderHtml(parsedHTML);

    } catch (err) {
      console.error(err);
    }
  }

  return;
}

export default handleHeader;
