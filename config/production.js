const config = {
  host: "localhost",
  port: process.env.PORT || "8080",

  DATABASE_CONFIGURATION: {
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    DIALECT: "postgres",
  },
};

export default config;
