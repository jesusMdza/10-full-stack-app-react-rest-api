# Mini REST API

A REST API app for a school database that contains info about courses and users. View, create, update, and delete users and courses. Some routes are provided security which require a user to log in with a username and password to view its contents. Please see the section **Routes That Require a Login** to use secured routes. ***This app can be used on your local browser but it's designed to be used and tested with Postman (Postman link at the bottom of this readme).***

## Made with:
- Node
- Express
- bcryptjs
- basic-auth
- Sequelize

## Routes Available
Type of requests that can be run on "User" and "Course" routes with Postman:
### User Routes
- `GET` **https://localhost:5000/api/users** **\*\***
- `POST` **https://localhost:5000/api/users**

**\*\*** *Requires Login, see **Routes That Require a Login***

### Course Routes
- `GET` **https://localhost:5000/api/courses**
- `GET` **https://localhost:5000/api/courses/:id**
- `POST` **https://localhost:5000/api/courses** **\*\***
- `PUT` **http://localhost:5000/api/courses/:id** **\*\***
- `DELETE` **http://localhost:5000/api/courses/:id** **\*\***

**\*\*** *Requires Login, see **Routes That Require a Login***

## Download & Run
To run this on your local machine:
- `npm install`
- `npm start`

To know if the app is running successfully, please view your code editor's terminal and check for these messages:
  - `Connection to the database has been successful`
  - `Express server is listening on port 5000`

## Routes That Require a Login
Some routes require a valid username and password in order to use them. You can achieve this in *Postman* by doing one of the following:
- Creating a new user with a `POST` request at **https://localhost:5000/api/users** and using those credentials against the secured routes
- Using this login:
  - Username: **sally@jones.com**
  - Password: **sallypassword**
  
*Since this app uses the ***basic-auth*** package, in the ***Authorization*** tab in Postman, select ***Basic Auth*** before entering a username and password*

## Postman
https://www.postman.com/
