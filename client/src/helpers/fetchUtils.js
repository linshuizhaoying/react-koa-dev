const handleResponse = (res) => {
  let contentType = res.headers.get('content-type');
  if(contentType.includes('application/json')) {
    return handleJSONResponse(res);
  } else if(contentType.includes('text/html')) {
    return handleTextResponse(res);
  } else {
    throw new Error(`sorry, content-type ${contentType} not supported`);
  }
}
const handleJSONResponse = (res) =>  {
  return res.json()
    .then(json => {
      if(res.ok) {
        return json;
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: res.status,
          statusText: res.statusText
        }))
      }
    })
}

const handleTextResponse = (res) => {
  return res.text()
    .then(text => {
      if(res.ok) {
        return text;
      } else {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
          err: text
        })
      }
    })
}
export default class FetchUtils {

  static enhanceFetch = (url, options = FetchUtils.options()) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
      .then(handleResponse)
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err); // err.message是存在的
      })
    })
  }

  /**
   * [options fetch请求的第二个参数]
   * @param  {[string || undefined]} method [get还是post，其中get请求可以省略第二个参数]
   * @param  {[Object]} body   [对象类型的参数]
   * @return {[Object]}        [作为fetch的第二个参数options]
   */
  static options(method, body = {}) {
    if(method && typeof method !== 'string') {
      throw new Error('incorrect type of fetch\'s options');
    }
    let option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include', // 是否携带cookie
    };
    if(method && method.toLocaleUpperCase() === 'POST'){
      option.method = 'POST';
      if(typeof body === 'object') {
        option.body = JSON.stringify(body);
      } else {
        option.body = body;
      }
    }
    return option;
  }

  /**
   * [getFetchUrlWithParams 将对象类型的参数转化成字符串类型参数]
   * @param  {[string]} url [接口url]
   * @param  {[Object]} obj [对象类型的参数]
   * @return {[string]}     [拼接到url后的参数]
   */
  static getFetchUrlWithParams(url, obj) {
    url = url + '?';
    if(Object.prototype.toString.call(obj) !== "[object Object]") {
      throw new Error('incorrect type of fetch\'s params');
    }
    Object.keys(obj).forEach((key, i) => {
      if(i === 0) {
        url += `${key}=${obj[key]}`;
      } else {
        url += `&${key}=${obj[key]}`;
      }
    })
    return url;
  }
}
