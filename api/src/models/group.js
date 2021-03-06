'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true
    }
  });
  Group.associate = function(models) {
    Group.hasMany(models.Word);
  };
  return Group;
};