import { Project } from "../../entities/Project";
import { Stage } from "../../entities/Stage";
import { Progress } from "../stage/stage.interfaces";
import { ProjectService } from "./project.interfaces";

async function generateStages(projectId: number): Promise<Stage[]> {
  try {
    const stages = [];
    const stageProgress = [Progress.TODO, Progress.DOING, Progress.DONE];
    stageProgress.forEach(async (progress) => {
      let stage = new Stage();
      stage.progress = progress;
      stage.projectId = projectId;
      stage = await stage.save();
      stages.push(stage);
    });
    return stages;
  } catch (error) {
    throw error;
  }
}

export const projectService: ProjectService = {
  getAllProjects: async (_, callback) => {
    try {
      const projects = await Project.find();
      callback(null, { projects });
    } catch (error) {
      console.error(error);
      callback(error, null);
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
      await generateStages(project.id);
      console.log(project);
      callback(null, {
        ...project,
      });
    } catch (error) {
      console.error(error);
      callback(error, null);
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
      callback(error, null);
    }
  },
  deleteProject: async (call, callback) => {
    try {
      const { id } = call.request;
      await Project.delete({ id });
      callback(null, { ok: true });
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },
};
