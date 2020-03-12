'use strict';
const Sequelize = require('sequelize');

// User Model
module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name is required"
        },
        notEmpty: {
          msg: 'First name cannot be empty'
        },
        is: {
          args: /^[a-z ,.'-]+$/i,
          msg: "First name must contain letters and or ,.'- characters only"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name is required"
        },
        notEmpty: {
          msg: "Last name cannot be empty"
        },
        is: {
          args: /^[a-z ,.'-]+$/i,
          msg: "Last name must contain letters and or ,.'- characters only"
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Email must be in correct format. (e.g., example@domain.com)"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        }, 
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    }
  }, {sequelize});

  // one-to-many association between User (Source) and Course (Target)
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'owner',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  }
  
  return User;
}