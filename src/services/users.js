import api from "./baseApi";

const usersApi = {
  getListUsers() {
    return api.get("/users");
  },
  getUserInfo(id) {
    return api.get(`/users/${id}`);
  },
  updatePassword(id) {
    return api.get(`/users/update-password/${id}`);
  },
  updateUserInfo(id) {
    return api.put(`/users/update/${id}`);
  },
  deleteUsers(id) {
    return api.delete(`/users/delete/${id}`);
  },
};

export default usersApi;
