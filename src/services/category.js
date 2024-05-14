import api from './baseApi';

const categoryApi = {
  getAdminCategories: () => {
    return api.get('/categories');
  },
  getCategories: (id) => {
    return api.get(`/categories/${id}`);
  },
  postCategory: (data) => {
    return api.post('/categories/create', data);
  },
  updateCategories: (data) => {
    return api.put('/categories/update', data);
  },
  deleteCategory: (id) => {
    return api.delete(`/categories/delete/${id}`);
  },
};

export default categoryApi;
