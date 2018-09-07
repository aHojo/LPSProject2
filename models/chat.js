module.exports = function (sequelize, DataTypes) {
	var Chats = sequelize.define("Chats", {
		text: DataTypes.STRING,
		from: {
			type:DataTypes.BIGINT,
			allowNull: true
		},
		bubbleAlt: DataTypes.BOOLEAN
    });
    
    Chats.associate = function (models) {
		// We're saying that a Burger should belong to an Customer
		// A Burger can't be created without a Customer due to the foreign key constraint
		Chats.belongsTo(models.Numbers, {
			foreignKey: "number",
		});
	};
	return Chats;
};