const urlParsingNode = document.createElement('a');
urlParsingNode.setAttribute('href', window.location.href);
const currentOrigin = { protocol: urlParsingNode.protocol, host: urlParsingNode.host };

/**
 * 判断 url 是否同源
 * @param url
 * @return 是否同源
 */
function isURLSomeOrigin (url: string): boolean {
  urlParsingNode.setAttribute('href', url);
  const urlOrigin = { protocol: urlParsingNode.protocol, host: urlParsingNode.host };

  return (
    currentOrigin.host === urlOrigin.host &&
    currentOrigin.protocol === urlOrigin.protocol
  )
}

export default isURLSomeOrigin;