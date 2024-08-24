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
      userID: 4,
      userType: 'user',
      bugTitle: 'App crashes on login',
      bugDescription: 'The application crashes every time I try to log in with my credentials.',
      bugSteps: '1. Open the app. 2. Enter valid credentials. 3. Press the login button. 4. Observe the app crash.',
      bugState: 'Unread',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 2,
      userType: 'user',
      bugTitle: 'Error message on profile update',
      bugDescription: 'An error message appears when trying to update the profile information.',
      bugSteps: '1. Go to profile settings. 2. Make changes to the profile. 3. Click on save. 4. Error message is displayed.',
      bugState: 'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 1,
      userType: 'admin',
      bugTitle: 'Payment gateway not processing',
      bugDescription: 'Payment fails to process when using credit card option.',
      bugSteps: '1. Add items to cart. 2. Proceed to checkout. 3. Select credit card payment. 4. Payment fails.',
      bugState: 'Resolved',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 3,
      userType: 'user',
      bugTitle: 'Slow loading times on dashboard',
      bugDescription: 'The dashboard takes too long to load, especially with a large amount of data.',
      bugSteps: '1. Log into the app. 2. Navigate to the dashboard. 3. Observe slow loading times.',
      bugState: 'Unread',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userID: 5,
      userType: 'user',
      bugTitle: 'Notifications not appearing',
      bugDescription: 'Notifications are not being displayed even when new messages arrive.',
      bugSteps: '1. Send a message to another user. 2. Wait for a notification. 3. Observe that no notification appears.',
      bugState: 'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('feedbacks', [{
      userId: 1,
      userType: 'user',
      feedbackTitle: 'Great new features',
      feedbackDescription: 'The new features in the latest update are fantastic! Dark mode is a standout addition, making it easier on the eyes during nighttime browsing. Keep up the great work!',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 2,
      userType: 'admin',
      feedbackTitle: 'Suggestion for better UX',
      feedbackDescription: 'The user experience could be enhanced with more intuitive navigation, like simplified menus and better access to key features. This would greatly improve overall usability.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 3,
      userType: 'user',
      feedbackTitle: 'App performance',
      feedbackDescription: 'I’ve noticed a significant improvement in app performance, particularly with faster loading times. It’s much smoother now, which really enhances the user experience.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 4,
      userType: 'user',
      feedbackTitle: 'Issue with the recent update',
      feedbackDescription: 'After installing the latest update, I encountered some bugs that were not present before. These issues need to be addressed to restore the app’s previous stability.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      userId: 5,
      userType: 'user',
      feedbackTitle: 'Loving the new interface',
      feedbackDescription: 'The new interface design is a huge improvement! It’s more user-friendly and visually appealing, making navigation easier and the overall experience more enjoyable.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);



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
