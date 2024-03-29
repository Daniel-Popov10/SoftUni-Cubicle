# Educational express app - JS Back-End - May 2023

Cubicle is a small educational app delevoped during the javaScript Back-end softUni course. It is written entirely in expressJS. 

The app uses the following technology stack and libraries for it's core functionalities.

### Database: MongoDB (using mongoose ODM)
### Templating engine: Express-Handlebars
### User sessions, authentication and password hashing: Bcrypt and JSONwebtoken
### Error handling and validation: Mongoose schema validation

## Summary: 

The app offers users the ability to create an account and browse a catalog of different rubik cubes created by themselves or other users. Each user can view details about the cubes, add a new cube or add an accessory which they can later attach to their cube. 

The owner of a cube is also permitted to attach an accessory to their cube, as well as edit it's details or delete it. If the cube is not created by them, they are only able to view it's details.

## How to run the application

In order to run the application navigate to the main directory and run the command `npm start`, you can then access the application by navigating to `http://localhost:3000/` in your browser.

## A screenshot of the application

![image](https://github.com/Daniel-Popov10/SoftUni-Cubicle/assets/114098743/0f7f5bf5-f005-4259-adab-6a8d6027c98f)
