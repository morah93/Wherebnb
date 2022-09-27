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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId:'1',
        address:'1 state st',
        city:'Paris',
        state:'FrenchFries',
        country: 'France',
        lat: 12.34,
        lng: 43.76,
        name: 'Villa De Franc',
        description: 'Large villa on lake',
        price: 3000
      },
      {
        ownerId:'2',
        address:'2nd mansion st',
        city:'Bolseno',
        state:'Viterbo',
        country: 'Italy',
        lat: 76.23,
        lng: 65.24,
        name: 'El Mansion un el leek',
        description: 'Mansion on a lake',
        price: 1500
      },
      {
        ownerId:'3',
        address:'1 Castle rt',
        city:'El Pilar',
        state:'Madrid',
        country: 'Spain',
        lat: 40.47,
        lng: -3.70,
        name: 'Tu era Castele',
        description: 'Castle',
        price: 15000
      },
      {
        ownerId:'4',
        address:'34122',
        city:'Fatih',
        state:'Istanbul',
        country: 'Turkey',
        lat: 41.01,
        lng: 28.98,
        name: 'Topkapi Palace',
        description: 'Palace from Ottoman Empire',
        price: 20000
      },
      {
        ownerId:'5',
        address:'2 River st',
        city:'JungleBook',
        state:'Jungle',
        country: 'Sherkhans Kingdom',
        lat: 76.21,
        lng: 21.98,
        name: 'De Mud Hut',
        description: 'Hut',
        price: 250
      },


     ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Spots', {});
  }
};
