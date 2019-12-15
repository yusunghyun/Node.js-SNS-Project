module.exports = (sequelize, Sequelize) => {
  return sequelize.define('hashtag',{
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    }
  },{
    timestamps: true,
    paranoid: true,//정보보관?
    charset: 'utf8',//한글?
    collate: 'utf8_general_ci',//한글?2
    tableName: 'hashtag'
  })
}