import { TaskService } from "./task.interfaces";

export const taskService: TaskService = {
  async createTask(call, callback) {
    try {
      callback(null, {} as any);
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
  updateTask(call, callback) {
    try {
      callback(null, {} as any);
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
  deleteTask(call, callback) {
    try {
      callback(null, {} as any);
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
};
