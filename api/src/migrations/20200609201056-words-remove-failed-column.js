'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Words', 'failed', {  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'Words',
        'failed', 
        {  
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      );
  }
};
