module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PostId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Comments;
  };