'use strict';
module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    valueNative: DataTypes.STRING,
    valueForeign: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    answered: DataTypes.INTEGER,
    failed: DataTypes.INTEGER
  }, {});
  Word.associate = function(models) {
    Word.belongsTo(models.Group);
  };
  return Word;
};