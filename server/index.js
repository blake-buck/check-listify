require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const authController = require('./controllers/authentication');

const app = express();
app.use(bodyParser.json());


// AUTHENTICATION ROUTES

// username, password  --> fields on req.body
app.post('/api/register', async (req, res) =>  await authController.register(req, res));
app.post('/api/login',    async (req, res) => await authController.login(req, res));

// previousPassword, proposedPassword --> fields on req.body
app.post('/api/change-password', async (req, res) => await authController.changePassword(req, res))

// username --> fields on req.body
app.post('/api/forgot-password', async (req, res) => await authController.forgotPassword(req, res))

// username, password, confirmation code --> fields on req.body
app.post('/api/forgot-password/confirm', async (req, res) => await authController.confirmForgotPassword(req, res))

// userId is pulled from JWT
app.delete('/api/delete-account', async (req, res) => await authController.deleteAccount(req, res));



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));