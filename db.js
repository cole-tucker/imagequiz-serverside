require('dotenv').config();
const { Pool } = require('pg');

let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.mydbusername;
let password = process.env.password;

let connectionString =
`postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

let addCustomer = (name, email, password) => {
    return pool.query('insert into imagequiz.customers(name, email, password) values ($1, $2, $3)', [name, email, password])
    .then(() => console.log('The customer was saved.'))
    .catch(e => console.log(e));
}

let addScore = (customerid, quizid, score) => {
    return pool.query('insert into imagequiz.scores(customerid, quizid, score) values ($1, $2, $3)', [customerid, quizid, score])
    .then(() => console.log('The score was saved.'))
    .catch(e => console.log(e));
}

let getFlowers = () => {
    console.log(connection.connectionString);
    let sql = `select * from imagequiz.flowers f`;
    return pool.query(sql)
    .then(result => result.rows);
}

let getQuizzes = () => {
    let sql = `select * from imagequiz.quizzes f`;
    return pool.query(sql)
    .then(result => result.rows);
}
module.exports = { addCustomer, addScore, getFlowers, getQuizzes }