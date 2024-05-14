import api from './baseApi';

const authApi = {
  signin(params) {
    return api.post('/authn/sign-in', params);
  },
  signup(params) {
    return api.post('/authn/sign-up', params);
  }
};

export default authApi;
