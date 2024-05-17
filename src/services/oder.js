import api from "./baseApi";

const orderApi = {
  getOrders() {
    return api.get("/orders");
  },
  getDetailOrder(id) {
    return api.get(`/orders/${id}`);
  },
  postCart(id) {
    return api.post(`/orders/add/${id}`);
  },
  updateStatusOrder(id, param) {
    return api.put(`/orders/update/${id}`, param);
  },
  deleteOrder(id) {
    return api.delete(`/orders/delete/${id}`);
  },
};

export default orderApi;
