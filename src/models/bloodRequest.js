const bloodRequest = (sequelize, DataTypes) => {
  const BloodRequest = sequelize.define("bloodRequest", {
    bloodGroup: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A bloodRequest has to have a text."
        }
      }
    }
  });

  BloodRequest.associate = models => {
    BloodRequest.belongsTo(models.User);
  };

  return BloodRequest;
};

export default bloodRequest;
