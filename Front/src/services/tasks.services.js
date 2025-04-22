import { BaseService } from './base.services';

export class TaskService extends BaseService {
  constructor(getToken) {
    super(import.meta.env.VITE_BASE_URL, getToken); 
  }

  getAllTasks() {
    return this.get('tasks');
  }

  getTaskById(taskId) {
    return this.get(`tasks/${taskId}`);
  }

  createTask(taskData) {
    return this.post('tasks', taskData);
  }

  updateTask(taskId, updatedData) {
    return this.put(`tasks/${taskId}`, updatedData);
  }

  deleteTask(taskId) {
    return this.delete(`tasks/${taskId}`);
  }
}
