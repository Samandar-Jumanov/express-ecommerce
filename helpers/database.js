const Sequelize = require('sequelize');
require('dotenv').config()

const db_url = process.env.DATABASE
const sequelize = new Sequelize(db_url , {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('../models/users')(sequelize, Sequelize);
db.Contents = require('../models/contents')(sequelize, Sequelize);

db.Users.hasMany(db.Contents ,  { as : 'contents'});
db.Contents.belongsTo(db.Users);

module.exports = db;
