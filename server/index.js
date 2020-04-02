require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {useAuthenticationRoutes} = require('./routes/authentication');
const {useAccountRoutes} = require('./routes/account');


const app = express();


app.use(bodyParser.json());

useAuthenticationRoutes(app);
useAccountRoutes(app);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));