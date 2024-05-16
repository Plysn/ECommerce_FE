import api from "./baseApi";

const usersApi = {
  getListUsers() {
    return api.get("/users");
  },
  getUserInfo(id) {
    return api.get(`/users/${id}`);
  },
  updatePassword(id, param) {
    return api.post(`/users/update-password/${id}`, param);
  },
  updateUserInfo(id, param) {
    return api.put(`/users/update/${id}`, param);
  },
  deleteUsers(id) {
    return api.delete(`/users/delete/${id}`);
  },
};

export default usersApi;
