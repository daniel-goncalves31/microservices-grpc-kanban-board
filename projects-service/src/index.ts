import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    console.log("Connection completed");
  })
  .catch((error) => console.log(error));
