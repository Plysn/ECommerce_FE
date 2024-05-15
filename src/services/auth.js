import api from "./baseApi";

const authApi = {
  signin(params) {
    return api.post("/auth/sign-in", params);
  },
  signup(params) {
    return api.post("/auth/sign-up", params);
  },
};

export default authApi;
