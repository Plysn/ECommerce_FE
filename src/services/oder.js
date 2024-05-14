import api from './baseApi';

const orderApi = {
  getOrders() {
    return api.get('/carts');
  },
  postCart(id) {
    return api.post(`/carts/add/${id}`);
  },
  deleteCart(id) {
    return api.delete(`/carts/delete/${id}`);
  },
}

export default orderApi;
