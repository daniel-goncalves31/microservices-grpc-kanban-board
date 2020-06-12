import { Server } from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Project } from "./entities/Project";

createConnection()
  .then(async (connection) => {
    console.log("Connection completed");
    const server = new Server();
    server.listen(3335);
    const projects = await Project.find();
    console.log(projects);
  })
  .catch((error) => console.log(error));
