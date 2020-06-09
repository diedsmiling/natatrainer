'use strict';
module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    valueNative: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    valueForeign: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false,
    },
    answered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Word.associate = function(models) {
    Word.belongsTo(models.Group);
  };
  return Word;
};