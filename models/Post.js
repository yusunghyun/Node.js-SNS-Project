module.exports = (sequelize, Sequelize) => {
  return sequelize.define('post',{
    comment: {
      type: Sequelize.STRING(140),//140자
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(255),//이미지경로 길 수 있으니
      allowNull: true, //이미지를 등록 안할 수도 있으니
    }
  },{
    timestamps: true,
    paranoid: true,//정보보관?
    charset: 'utf8',//한글?
    collate: 'utf8_general_ci',//한글?2
    tableName: 'post'
  })
}