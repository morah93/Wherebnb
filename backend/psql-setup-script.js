const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.incudes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA)
  }
});
