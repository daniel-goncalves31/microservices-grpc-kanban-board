import { Project } from "../../entities/Project";
import { ProjectService } from "./project.interfaces";

export const projectService: ProjectService = {
  getAllProjects: async (_, callback) => {
    try {
      const projects = await Project.find();
      callback(null, { projects });
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
  createProject: async (call, callback) => {
    try {
      const { name, priority, userId } = call.request;
      let project = new Project();
      project.name = name;
      project.priority = priority;
      project.userId = userId;
      project = await project.save();
      console.log(project);
      callback(null, {
        ...project,
      });
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
  updateProject: async (call, callback) => {
    try {
      const { name, priority, id, status } = call.request;
      const project = await Project.findOne({ where: { id } });
      project.name = name;
      project.priority = priority;
      project.status = status;
      await project.save();
      callback(null, { ok: true });
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
  deleteProject: async (call, callback) => {
    try {
      const { id } = call.request;
      await Project.delete({ id });
      callback(null, { ok: true });
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
};
