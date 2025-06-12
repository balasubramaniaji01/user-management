import { api } from '../api/api';
import { API_URLS } from '../api/urls';

export const userService = {
  login: (credentials: { email: string; password: string }) =>
    api.post(API_URLS.login, credentials),

  getUsers: () => api.get(API_URLS.userList),

  getUserById: (id: string) => api.get(API_URLS.userDetails(id)),

  updateUser: (id: string, data: unknown) => api.put(API_URLS.updateUser(id), data),

  deleteUser: (id: string) => api.delete(API_URLS.deleteUser(id)),
};
