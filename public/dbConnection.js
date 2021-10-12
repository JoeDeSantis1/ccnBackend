/*
    Functions for interacting with the MySQL DB
*/

const db = require('mysql');

require('dotenv').config();


const dbConnection = db.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    insecureAuth: true
}
)

const startConnection = () => {
    dbConnection.connect(function(err) {
        if (err) throw err;
        console.log('We are connected to the database as well');
    });
};

const runQuery = (chosenStatement) => {
    dbConnection.query(`${chosenStatement}`, function(err, result) {
        if (err) throw err;
       // console.log('nurse added to the database');
    });
};

const addNurseName = (nurseID, firstName, lastName, clinicalLadder, skills) => {
    dbConnection.query(`INSERT INTO nurses (NurseID, FirstName, LastName, ClinicalLadder, Skills, LastInCCN, HireDate) VALUES ('${nurseID}', '${firstName}', '${lastName}', '${clinicalLadder}', '${skills}', 'null', 'null')`, function(err) {
        if (err) throw err;
        console.log(`${firstName} has been added to the database`);
    });
};

const changeDB = (db) => {
    dbConnection.query(`USE ${db}`, function(err) {
        if (err) throw err;
    });
};

const pullNurses = (result) => {
    dbConnection.query('SELECT * FROM nurses', function(err, res) {
        if (err) throw err;
        result(err, res);
    });
};

const requestInfo = (column, id) => {
    dbConnection.query(`SELECT ${column} FROM nurses WHERE nurseID='${id}'`, function(err, res) {
        if (err) throw err;
        console.log(res)
        return(err, res);
    });
};

const pullNurseDate = (result) => {
    dbConnection.query('SELECT * FROM schedule', function(err, res) {
        if (err) throw err;
        result(err, res);
    });
};

module.exports = {startConnection, runQuery, addNurseName, pullNurses, pullNurseDate, changeDB, requestInfo};