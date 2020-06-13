import "reflect-metadata";
import { createConnection } from "typeorm";
import server from "./server/server";

createConnection()
  .then(async (_) => {
    console.log("Connection completed");
    server.start();
  })
  .catch((error) => console.log(error));
