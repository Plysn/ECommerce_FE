import api from './baseApi';

const productApi = {
  getListProducts() {
    return api.get('/products');
  },
  getProduct(id) {
    return api.get(`/product/${id}`);
  },
  getListProductsByCategory(categoryId) {
    return api.get(`/products/${categoryId}`);
  },
  postProduct(data) {
    return api.post('/products/create', data);
  },
  updateProduct(id) {
    return api.put(`/products/update/${id}`);
  },
  deleteProduct(id) {
    return api.delete(`/products/delete/${id}`);
  }
}

export default productApi;
