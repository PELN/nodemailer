const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware/verifyToken');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cookieParser());

// routes
const users = require('./routes/usersRoute.js');
app.use(users);

const emails = require('./routes/emailsRoute.js');
app.use(emails);

// import knex and objection libraries
const Knex = require('knex');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const knex = Knex(knexConfig.development);
Model.knex(knex);

app.get('/profile', withAuth, function(req, res) {
    res.send('Welcome!');
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});
  
const server = app.listen(5000, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on port: ", server.address().port);
});
