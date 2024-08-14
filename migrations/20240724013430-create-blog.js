'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staffID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "staffs",
          key: 'id'
        }
      },
      blogTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      blogPicture: {
        type: Sequelize.STRING
      },
      blogContent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      blogLikes: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: -1
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};