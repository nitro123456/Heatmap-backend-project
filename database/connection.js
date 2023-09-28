const { Sequelize, DataTypes } = require("sequelize");
const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = require("../constants/index");

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("seq err", err.message));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user")(sequelize, DataTypes);
db.heatmap = require("../models/heatmap")(sequelize, DataTypes);
db.user.hasMany(db.heatmap, { foreignKey: "userId" });
db.heatmap.belongsTo(db.user, { foreignKey: "userId" });
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => console.log(`Sync Error: ${err}`));


module.exports = db;
