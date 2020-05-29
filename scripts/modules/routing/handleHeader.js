import requestHTML from './requestHTML.js';
import parseHTML from './parseHTML.js';

const injectHeaderHtml = (
  content,
  $contentContainer = document.querySelector('body')
) => {
  $contentContainer.prepend(content);
}

const handleHeader = async (
  siteHeaderSeletor = '.js-site-header'
) => {
  const $siteHeader =  document.querySelector(siteHeaderSeletor);

  if (!$siteHeader) {
    try {
      const html = await requestHTML('/');
      const parsedHTML = await parseHTML(html, siteHeaderSeletor);
      injectHeaderHtml(parsedHTML);

    } catch (err) {
      console.error(err);
    }
  }

  return;
}

export default handleHeader;
