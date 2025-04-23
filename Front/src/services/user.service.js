import { BaseService } from './base.services';

export class UserService extends BaseService {
  constructor(getToken) {
    super(import.meta.env.VITE_BASE_URL, getToken);
  }

  getUserById(userId) {
    return this.get(`users/${userId}`);
  }

  createUser(userData) {
    return this.post('users', userData);
  }

  updateUser(userId, updatedData) {
    return this.put(`users/${userId}`, updatedData);
  }

  deleteUser(userId) {
    return this.delete(`users/${userId}`);
  }

  getCurrentUser() {
    return this.get('users/me');
  }

  updateCurrentUser(updatedData) {
    return this.put('users/me', updatedData);
  }
}
