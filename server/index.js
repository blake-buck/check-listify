require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {useAuthenticationRoutes} = require('./routes/authentication');
const {useAccountRoutes} = require('./routes/account');
const {useChecklistRoutes} = require('./routes/checklist');

const {slowdown} = require('./routes/middleware/slowdown');
const {rateLimiter} = require('./routes/middleware/rateLimiter');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin:['http://localhost:8080','http://localhost:5000']
}))

// global slowdown
app.use(
    slowdown(11000, 60, 1000)
);

// global rate limiter
app.use(
    rateLimiter(12000, 60)
);

useAuthenticationRoutes(app);
useAccountRoutes(app);
useChecklistRoutes(app);

app.get(
    '*', 
    express.static(path.join(__dirname, '../client/dist/')),
    (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    }
);


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));