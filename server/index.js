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

// userId is pulled from JWT
app.delete('/api/delete-account', async (req, res) => await authController.deleteAccount(req, res));



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));