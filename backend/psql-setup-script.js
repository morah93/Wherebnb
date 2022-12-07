const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.incudes(process.env.Schema)) {
    await sequelize.createSchema(process.env.Schema)
  }
});
