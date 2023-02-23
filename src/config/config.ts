export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  databaseConfig: {
    databaseURL: process.env.DATABASE_URL,
  },
});
