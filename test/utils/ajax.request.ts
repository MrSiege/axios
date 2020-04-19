function ajaxRequest(delay: number = 0): Promise<JasmineAjaxRequest> {
  return new Promise(
    res => setTimeout(() => res(jasmine.Ajax.requests.mostRecent()), delay)
  )
}

export default ajaxRequest;