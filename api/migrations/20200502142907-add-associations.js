'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Words', ['groupId'], {
      type: 'FOREIGN KEY',
      name: 'FK_word_groupId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Groups',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Words', 'FK_word_groupId')
  }
};
