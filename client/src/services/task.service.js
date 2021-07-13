import Service from './service';
import request from '../utils/request';

export default class Task extends Service {
  constructor() {
    const api = 'task';
    super(api);
  }

  add(id, data) {
    return request({
      url: `${this.apiURL}/${id}`,
      method: 'post',
      data,
    }).then((result) => result);
  }
}
