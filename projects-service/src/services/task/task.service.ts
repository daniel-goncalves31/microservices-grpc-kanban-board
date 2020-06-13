import { Task } from "../../entities/Task";
import { TaskService } from "./task.interfaces";

export const taskService: TaskService = {
  async createTask(call, callback) {
    try {
      const { stageId, name } = call.request;
      let task = new Task();
      task.name = name;
      task.stageId = stageId;
      task = await task.save();
      callback(null, task);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },
  async updateTask(call, callback) {
    try {
      const { id, name } = call.request;
      const task = await Task.findOne({ where: { id } });
      task.name = name;
      await task.save();
      callback(null, { ok: true });
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },
  async deleteTask(call, callback) {
    try {
      const { id } = call.request;
      await Task.delete({ id });
      callback(null, { ok: true });
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },
};
