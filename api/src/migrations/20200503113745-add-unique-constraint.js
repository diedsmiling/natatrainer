'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Groups', ['name'], {
      type: 'UNIQUE',
      name: 'UQ_group_name', // useful if using queryInterface.removeConstraint
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Groups', 'UQ_group_name')
  }
};
