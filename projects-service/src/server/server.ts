import * as protoloader from "@grpc/proto-loader";
import * as grpc from "grpc";
import { join } from "path";
import { projectService } from "../services/project/project.service";
import { taskService } from "../services/task/task.service";

const TASK_PATH = join(__dirname, "..", "protos", "task.proto");
const PROJECT_PATH = join(__dirname, "..", "protos", "project.proto");

const protoLoaderOptions: protoloader.Options = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
};

const taskDefinition = protoloader.loadSync(TASK_PATH, protoLoaderOptions);
const projectDefinition = protoloader.loadSync(
  PROJECT_PATH,
  protoLoaderOptions
);

const taskProto = grpc.loadPackageDefinition(taskDefinition).task;
const projectProto = grpc.loadPackageDefinition(projectDefinition).project;
console.log(process.env.PROJECTS_SERVICE_URL);
const server = new grpc.Server();
server.addService((taskProto as any).TaskService.service, taskService);
server.addService((projectProto as any).ProjectService.service, projectService);
server.bind("0.0.0.0:3335", grpc.ServerCredentials.createInsecure());

export default server;
