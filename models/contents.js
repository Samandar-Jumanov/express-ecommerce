module.exports = (sequelize, DataTypes) => {
    const Content = sequelize.define('Content', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull: false  
      }
    });
  
    return Content;
  };
  