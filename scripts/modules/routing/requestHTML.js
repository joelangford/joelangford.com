const requestHTML = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const html = await response.text();
    return html;
  } else {
    return response.status;
  }
}

export default requestHTML;
