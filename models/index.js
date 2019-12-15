// 'use strict';
/*연결하는곳? 각테이블마다의 관계도 설정하는곳*/
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
db.Post=require('./Post.js')(sequelize,Sequelize);
db.HashTag=require('./HashTag.js')(sequelize,Sequelize);

//관계설정  1 : N 관계.
db.User.hasMany(db.Post);// 한 user가 여러개의 post를 갖을 수 있다
db.Post.belongsTo(db.User);// 포스트는 유저에 속해있다.

//관계설정  M : N 관계.
db.Post.belongsToMany(db.HashTag, {through: 'post_hashtag'});// M:N 는 belongsMany 1:N 는 hasMany , 옵션
db.HashTag.belongsToMany(db.Post, {through: 'post_hashtag'});// 이렇게 두줄 박으면 알아서 가운데놈 테이블 생성 = 

//팔로우 팔로잉 관계
db.User.belongsToMany(db.User, {through: "follow", foreignKey: 'following_id', as: 'follwers'});//하나의 테이블 안에서 관계 팔로우라는 테이블 만듦 = 유저와 유저의 관계가 들어있는 테이블, 팔로워 한사람한테 팔로잉 당한 사람의 아이디를 저장
db.User.belongsToMany(db.User, {through: "follow", foreignKey: 'following_id', as: 'followings'});//팔로잉당한사람한테 팔로워 한 사람의 아이디를 저장

module.exports = db;
