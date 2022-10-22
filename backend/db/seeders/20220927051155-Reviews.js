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
      userId: 5,
      review: 'Great',
      stars: 4
      },
      {
      spotId: 1,
      userId: 4,
      review: 'Nice place',
      stars: 5
      },
      {
      spotId: 2,
      userId: 3,
      review: 'Awesome',
      stars: 4
      },
      {
      spotId: 2,
      userId: 1,
      review: 'Clean',
      stars: 5
      },
      {
      spotId: 3,
      userId: 4,
      review: 'Fantastic',
      stars: 5
      },
      {
      spotId: 3,
      userId: 3,
      review: 'Fantastic',
      stars: 4
      },
      {
      spotId: 4,
      userId: 5,
      review: 'Breathtaking',
      stars: 5
      },
      {
      spotId: 4,
      userId: 2,
      review: 'Awesome',
      stars: 4
      },
      {
      spotId: 5,
      userId: 1,
      review: 'Great outdoors',
      stars: 5
      },
      {
      spotId: 5,
      userId: 3,
      review: 'Great',
      stars: 4
      },
      {
      spotId: 6,
      userId: 1,
      review: 'It was okay.',
      stars: 4
      },
      {
      spotId: 7,
      userId: 2,
      review: 'Cant say enough.',
      stars: 4
      },
      {
      spotId: 8,
      userId: 3,
      review: 'Awesome host.',
      stars: 5
      },
      {
      spotId: 9,
      userId: 4,
      review: 'Amazed and will return.',
      stars: 5
      },
      {
      spotId: 10,
      userId: 5,
      review: 'Loved it.',
      stars: 5
      },
      {
      spotId: 6,
      userId: 3,
        review: 'Breathtaking location.',
      stars: 5
      },
      {
      spotId: 7,
      userId: 1,
      review: 'Thoroughly enjoyed this vacation',
      stars: 5
      },
      {
      spotId: 8,
      userId: 2,
      review: 'Amazing views.',
      stars: 4
      },
      {
      spotId: 9,
      userId: 5,
      review: 'Welcoming hosts.',
      stars: 4
      },
      {
      spotId: 10,
      userId: 4,
      review: 'Enjoyed my stay',
      stars: 4
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
