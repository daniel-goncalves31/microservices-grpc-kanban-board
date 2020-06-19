import * as protoloader from "@grpc/proto-loader";
import * as grpc from "grpc";
import { join } from "path";
import { projectService } from "../services/project/project.service";
import { stageService } from "../services/stage/stage.service";
import { taskService } from "../services/task/task.service";

const ROOT_PATH = join(__dirname, "..", "protos", "root.proto");

const protoLoaderOptions: protoloader.Options = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
};

const packagesDefinition = protoloader.loadSync(ROOT_PATH, protoLoaderOptions);

const projectProto = grpc.loadPackageDefinition(packagesDefinition).project;
const stageProto = grpc.loadPackageDefinition(packagesDefinition).stage;
const taskProto = grpc.loadPackageDefinition(packagesDefinition).task;

const server = new grpc.Server();
server.addService((projectProto as any).ProjectService.service, projectService);
server.addService((stageProto as any).StageService.service, stageService);
server.addService((taskProto as any).TaskService.service, taskService);
server.bind("projects-service", grpc.ServerCredentials.createInsecure());

export default server;
