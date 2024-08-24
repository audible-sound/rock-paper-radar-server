'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('BugReports', [{
      userID: 1,
      userType: 'user',
      bugTitle: 'Bug report 1',
      bugDescription: 'Lorem Ipsum Dolor',
      bugSteps: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      bugState: 'Unread',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 2,
      userType: 'user',
      bugTitle: 'Bug report 2',
      bugDescription: 'Lorem Ipsum Dolor',
      bugSteps: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      bugState: 'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 1,
      userType: 'admin',
      bugTitle: 'Bug report 3',
      bugDescription: 'Lorem Ipsum Dolor',
      bugSteps: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      bugState: 'Resolved',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 3,
      userType: 'user',
      bugTitle: 'Bug report 4',
      bugDescription: 'Lorem Ipsum Dolor',
      bugSteps: 'TESTEESTE STSETSE TSETS ETSETS TETET ESTS TSET SETE ',
      bugState: 'Unread',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('feedbacks', [{
      userId: 1,
      userType: 'user',
      feedbackTitle: 'Feedback 1',
      feedbackDescription: 'Lorem Ipsum Dolor',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 1,
      userType: 'user',
      feedbackTitle: 'Feedback 2',
      feedbackDescription: 'Lorem Ipsum Dolor',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 1,
      userType: 'user',
      feedbackTitle: 'Feedback 3',
      feedbackDescription: 'Lorem Ipsum Dolor',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 2,
      userType: 'admin',
      feedbackTitle: 'Feedback 4',
      feedbackDescription: 'Lorem Ipsum Dolor',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 1,
      userType: 'user',
      feedbackTitle: 'Feedback 5',
      feedbackDescription: 'Lorem Ipsum Dolor',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
