module.exports = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  synchronize: false,
  logging: true,
  entities: ["src/entites/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entites",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
};
