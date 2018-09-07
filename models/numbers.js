module.exports = function (sequelize, DataTypes) {
	var Numbers = sequelize.define("Numbers", {
		name: DataTypes.STRING,
		number: {
			type: DataTypes.BIGINT,
			primaryKey: true
		}
	});
	return Numbers;
};