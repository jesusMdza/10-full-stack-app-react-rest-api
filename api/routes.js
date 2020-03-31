'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const db = require('./db');
const { Course, User } = db.sequelize.models;

// wraps each route function callback
function asyncHandler(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      res.status(500).json({errorMessage: `Internal Server Error: ${error}`});
    }
  }
}

// identify a user based on their credentials
const authenticateUser = async (req, res, next) => {
  let message;

  // attempts to retrieve signed in user's credentials
  // returns object if successful {name: example@domain.com, pass: somePassword}
  const credentials = auth(req);

  // if credentials are available, search through db
  // and compare user with credential name given
  if (credentials) {
    const users = await User.findAll();
    const user = users.find(u => u.emailAddress === credentials.name);
    console.log(credentials);
    
    // if user exists in db, compare passwords from db and credentials
    if (user) {
      const authenticated = bcryptjs
      .compareSync(credentials.pass, user.password);

      // if passwords match
      if (authenticated) {
        console.log(`Authentication successful for user ${credentials.name}`);
        req.currentUser = user;
      } else {
        message = `Failed to authenticate user ${credentials.name}`;
      }
    } else {
      message = `User ${credentials.name} not found`;
    }
  } else {
    message = 'Authorization header not found'
  }

  // if authentication failed, send a message denying the user access to a secure route
  // else, grant the user access to the secure route
  if (message) {
    console.warn(message);
    res.status(401).json({message: 'Access Denied'});
  } else {
    next();
  }
}

// GET authenticated user
router.get('/users', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.currentUser.id
      }
    });
    res.status(200).json(user);
  } catch (error) {
    throw error
  }
}));

// POST user(s)
router.post('/users', asyncHandler(async (req, res, next) => {
  try {

    // attempts to find existing user by email
    const existingUser = await User.findOne({
      where: {
        emailAddress: req.body.emailAddress
      }
    });

    // create user if existingUser is null
    // throw error if existingUser is returned
    if (existingUser === null) { 
      const user = await User.create(req.body);
      await user.update({
        password: bcryptjs.hashSync(req.body.password)
      });
      res.status(201).location('/').end();
    } else { 
      throw new Error("Email already exists");
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({error: errorMessages});
    } else if (error.message === "Email already exists") {
      res.status(400).json({error: [error.message]});
    } else {
      throw error;
    }
  }
}));

// GET course(s)
router.get('/courses', asyncHandler(async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'owner'
        }
      ]
    });
    res.status(200).json(courses);
  } catch (error) {
    throw error;
  }
}));

// GET course(s) by Id
router.get('/courses/:id', asyncHandler(async (req, res, next) => {
  let course;
  try {
    course = await Course.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          as: 'owner'
        }
      ]
    });
    if (course === null) {
      throw new Error('Course not found');
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    if (course === null) {
      res.status(404).json({message: error.message});
    } else {
      throw error;
    }
  }
}));

// POST course(s)
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ course: course });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({error: errorMessages});
    } else {
      throw error;
    }
  }
}));

// PUT (update) course(s)
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    course.title = req.body.title || "";
    course.description = req.body.description || "";
    course.estimatedTime = req.body.estimatedTime || "";
    course.materialsNeeded = req.body.materialsNeeded || "";

    await course.save();
    res.status(204).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = [];
      error.errors.map(error => errorMessages.push(error.message));
      res.status(400).json({error: errorMessages});
    } else if (error.message === "You are not authorized to modify this course") {
      res.status(403);
    } else {
      throw error;
    }
  }
}));

// DELETE course(s)
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    const ownerId = course.dataValues.userId;
    const currentUserId = req.currentUser.id;

    if (ownerId === currentUserId) {
      await course.destroy();
      res.status(204).end();
    } else {
      throw new Error("You are not authorized to modify this course");
    }
  } catch (error) {
    if (error.message === "You are not authorized to modify this course") {
      res.status(403).end();
    } else {
      throw error;
    }
  }
}));

module.exports = router;