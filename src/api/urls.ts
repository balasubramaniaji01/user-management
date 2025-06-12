const BASE_URL = '/api';

export const API_URLS = {
  login: `${BASE_URL}/login`,
  userList: `${BASE_URL}/users`,
  userDetails: (id: string) => `${BASE_URL}/users/${id}`,
  updateUser: (id: string) => `${BASE_URL}/users/${id}`,
  deleteUser: (id: string) => `${BASE_URL}/users/${id}`,
};
