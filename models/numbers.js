module.exports = function (sequelize, DataTypes) {
	var Numbers = sequelize.define("Numbers", {
		name: DataTypes.STRING,
		number: DataTypes.BIGINT
	});
	return Numbers;
};