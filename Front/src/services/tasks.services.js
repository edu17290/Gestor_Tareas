import { BaseService } from './base.services';

export class TaskService extends BaseService {
  constructor(getToken) {
    super(import.meta.env.VITE_BASE_URL, getToken); 
  }

  getAllTasks() {
    return this.get('tasks');
  }

}
