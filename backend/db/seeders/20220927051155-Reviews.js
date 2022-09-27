'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     */
    await queryInterface.bulkInsert('Reviews', [
      {
      spotId: 1,
      userId: 1,
      review: 'Great',
      stars: 4
      },
      {
      spotId: 2,
      userId: 2,
      review: 'Awesome',
      stars: 4
      },
      {
      spotId: 3,
      userId: 3,
      review: 'Fantastic',
      stars: 5
      },
      {
      spotId: 4,
      userId: 4,
      review: 'Breathtaking',
      stars: 5
      },
      {
      spotId: 5,
      userId: 5,
      review: 'Great outdoors',
      stars: 5
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Reviews', {});
  }
};
