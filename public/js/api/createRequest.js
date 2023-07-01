/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let {url, data, method, callback} = options;

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    let formData = new FormData();
  
    if (options.method === 'GET') {
      url += '?';
      for (let key in data) {
        url += key + '=' + data[key] + '&';
      }
    } else {
      for (let key in data) {
        formData.append(key, data[key]);
      }
    }
  
    xhr.open(options.method, url);
    xhr.send(formData);
  
    try {
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === xhr.DONE && xhr.status === 200) {
          options.callback(xhr.response.error, xhr.response);
        }
      });
    } catch (error) {
      options.callback(error);
    }
  };
