const requestHTML = async (url) => {
  let response = await fetch(url);

  if (response.ok) {
    let html = await response.text();
    return html;
  } else {
    return response.status;
  }
}

export default requestHTML;
