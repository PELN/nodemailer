const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// app.get('/', async (req, res) => {
// //    res.sendFile(__dirname + '/index.html');
// });

const users = require('./routes/usersRoute.js');
app.use(users);

// import knex and objection libraries
const Knex = require('knex');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const knex = Knex(knexConfig.development);
Model.knex(knex);



const server = app.listen(8080, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on port: ", server.address().port);
});
