module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user',{
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    userpw: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(16),
      allowNull: true,
    }
  },{
    timestamps: true,
    paranoid: true,//정보보관?
    charset: 'utf8',//한글?
    collate: 'utf8_general_ci',//한글?2
    tableName: 'user'
  })
}