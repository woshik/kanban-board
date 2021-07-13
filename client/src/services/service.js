import request from '../utils/request';

export default class Service {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  add(data) {
    return request({
      url: this.apiURL,
      method: 'post',
      data,
    }).then((result) => result);
  }

  get(params) {
    return request({
      url: this.apiURL,
      method: 'get',
      params,
    }).then((result) => result);
  }

  getById(id) {
    return request({
      url: `${this.apiURL}/${id}`,
      method: 'get',
    }).then((result) => result);
  }

  update(data) {
    return request({
      url: `${this.apiURL}${data.id ? `/${data.id}` : ''}`,
      method: 'patch',
      data,
    }).then((result) => result);
  }

  delete(id) {
    return request({
      url: `${this.apiURL}/${id}`,
      method: 'delete',
    }).then((result) => result);
  }
}
