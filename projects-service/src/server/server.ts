import * as protoloader from "@grpc/proto-loader";
import * as grpc from "grpc";
import { join } from "path";
import { projectService } from "../services/project/project.service";
import { stageService } from "../services/stage/stage.service";
import { taskService } from "../services/task/task.service";

const PROJECT_PATH = join(__dirname, "..", "protos", "project.proto");
const STAGE_PATH = join(__dirname, "..", "protos", "stage.proto");
const TASK_PATH = join(__dirname, "..", "protos", "task.proto");

const protoLoaderOptions: protoloader.Options = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
};

const projectDefinition = protoloader.loadSync(
  PROJECT_PATH,
  protoLoaderOptions
);
const stageDefinition = protoloader.loadSync(STAGE_PATH, protoLoaderOptions);
const taskDefinition = protoloader.loadSync(TASK_PATH, protoLoaderOptions);

const projectProto = grpc.loadPackageDefinition(projectDefinition).project;
const stageProto = grpc.loadPackageDefinition(stageDefinition).stage;
const taskProto = grpc.loadPackageDefinition(taskDefinition).task;

const server = new grpc.Server();
server.addService((projectProto as any).ProjectService.service, projectService);
server.addService((stageProto as any).StageService.service, stageService);
server.addService((taskProto as any).TaskService.service, taskService);
server.bind("0.0.0.0:3335", grpc.ServerCredentials.createInsecure());

export default server;
