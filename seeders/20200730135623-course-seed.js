"use strict";
const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          id: v4(),
          name: "Photoshop",
          price: 499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: "Illustrator",
          price: 499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: "Java",
          price: 499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          name: "Python",
          price: 499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
