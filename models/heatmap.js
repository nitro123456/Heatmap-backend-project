module.exports = (sequelize, DataTypes) => {
    const Heatmap = sequelize.define(
      "heatmap",
      {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          dateActivity: {
            type: DataTypes.JSONB, // Use JSONB to store the 2D array
            allowNull: false,
          },
      },
      {
        freezeTableName: true,
        tableName: "heatmap",
        timestamps: false,
      }
    );
  
    return Heatmap;
  };
  