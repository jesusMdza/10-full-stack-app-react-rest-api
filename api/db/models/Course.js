'use strict';
const Sequelize = require('sequelize');

// Course Model
module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required"
        },
        notEmpty: {
          msg: "Description cannot be empty"
        }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
      notEmpty: false
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      notEmpty: false
    },
  },
  {
    sequelize  
  });

  // one-to-many association between Course (target) and User (source)
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'owner',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID (userId) is required"
          }
        }
      },
    });
  }

  return Course;
}