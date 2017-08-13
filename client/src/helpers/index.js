const handleResponse = (res) => {
 // console.log(res, 111);
  let contentType = res.headers.get('content-type');
  if(contentType.includes('application/json')) {
    return handleJSONResponse(res)
  } else if(contentType.includes('text/html')) {
    return handleTextResponse(res)
  } else {
    throw new Error(`sorry, content-type ${contentType} not supported`);
  }
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
const handleJSONResponse = (res) => {
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

export const enhanceFetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url,options)
    .then(handleResponse)
    .then(json => {
      resolve(json);
    })
    .catch(err => {
      reject(err);
    })
  })
}
