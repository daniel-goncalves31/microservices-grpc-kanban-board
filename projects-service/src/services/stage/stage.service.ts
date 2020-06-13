import { Stage } from "../../entities/Stage";
import { StageService } from "./stage.interfaces";

export const stageService: StageService = {
  getAllProjectStages: async (call, callback) => {
    try {
      const { projectId } = call.request;
      const stages = await Stage.find({
        where: { projectId },
        relations: ["tasks"],
      });
      callback(null, { stages } as any);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  },
};
