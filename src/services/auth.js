import api from "./baseApi";

const authApi = {
  signin(params) {
    return api.post("/auth/sign-in", params);
  },
  signup(params) {
    return api.post("/auth/sign-up", params);
  },
  forgotPassword(params) {
    return api.post("/auth/forgot-password", params);
  },
  signinWithGoogle() {
    return api.get("/auth/google");
  },
  resetPassword(params) {
    return api.post("/auth/reset-password", params);
  }
};

export default authApi;
