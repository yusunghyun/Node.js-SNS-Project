// 'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

/* fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User=require('./User.js')(sequelize,Sequelize); //함수원형들어온걸 인자두개 넣고 실행(내용은 User.js)!

module.exports = db;
