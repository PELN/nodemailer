const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// app.get('/', async (req, res) => {
// //    res.sendFile(__dirname + '/index.html');
// });
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

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '../../client/src/App.js');
// });

// app.get('/', (req, res) => {
// 	res.send('PORT 5000');
// });

const server = app.listen(5000, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server is running on port: ", server.address().port);
});
