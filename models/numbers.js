module.exports = function(sequelize, DataTypes) {
  var Numbers = sequelize.define("Numbers", {
    number: DataTypes.INTEGER,
    
  });
  return Numbers;
};
