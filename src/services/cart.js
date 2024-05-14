import api from './baseApi';

const cartApi = {
  getCarts() {
    return api.get('/carts');
  },
  postCart(id) {
    return api.post(`/carts/add/${id}`);
  },
  deleteCart(id) {
    return api.delete(`/carts/delete/${id}`);
  },
}

export default cartApi;
