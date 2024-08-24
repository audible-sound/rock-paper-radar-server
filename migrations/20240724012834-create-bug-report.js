'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BugReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isIn: [['user', 'staff', 'admin']]
        }
      },
      bugTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bugDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bugSteps: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bugState: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BugReports');
  }
};