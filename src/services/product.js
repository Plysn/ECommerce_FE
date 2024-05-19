import api from "./baseApi";
import apiImg from "./baseApiImg";
const productApi = {
  getListProducts() {
    return api.get("/products");
  },
  getProduct(id) {
    return api.get(`/product/${id}`);
  },
  getListProductsByCategory(categoryId) {
    return api.get(`/products/${categoryId}`);
  },
  postProduct(data) {
    return apiImg.post("/products/create", data);
  },
  updateProduct(id, param) {
    return api.put(`/products/update/${id}`, param);
  },
  deleteProduct(id) {
    return api.delete(`/products/delete/${id}`);
  },

};

export default productApi;
