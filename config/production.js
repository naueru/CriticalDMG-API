module.exports = {
  host: process.env.SERVER_HOST || "criticaldmg-api.com",
  port: process.env.SERVER_PORT || "3000",

  DATABASE_CONFIGURATION: {
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    DIALECT: "postgres",
  },
};
