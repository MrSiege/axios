import { default as defer } from './defer';

function ajaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(
    res => defer(() => res(jasmine.Ajax.requests.mostRecent()))
  )
}

export default ajaxRequest;