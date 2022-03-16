const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define(
    "property_rental",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      porpertyID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      final_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statusPropertyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rental_dates: {
        type: DataTypes.DATE,
        allownull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allownull: false,
      },
      final_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false },
  )
}
