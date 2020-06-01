const parseHTML = (html, selector) => {
  let template = document.createElement('div');
  html = html.trim();
  template.innerHTML = html;
  const content  = template.querySelector(selector);

  if (content) {
    return content;
  }
}

export default parseHTML;
