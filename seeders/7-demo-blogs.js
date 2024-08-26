'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const blogs = [];

    for (let i = 1; i <= 20; i++) {
      const createdAt = faker.date.between({ from: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), to: new Date() });
      blogs.push({
        staffID: faker.number.int({ min: 1, max: 5 }),
        blogPicture: faker.image.url(),
        blogTitle: faker.lorem.sentence(),
        blogContent: faker.lorem.paragraph(), // Use paragraph instead of paragraphs
        blogLikes: faker.number.int({ min: 0, max: 1000 }),
        createdAt: createdAt,
        updatedAt: createdAt
      });
    }

    await queryInterface.bulkInsert('blogs', blogs);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};