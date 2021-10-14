/*
    Web Server
    Used for interacting with DB
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConnection = require('./public/dbConnection.js');
const path = require('path');
const cors = require('cors');
const port = 4000;

// Holds the nurse objects for nurses that will have their CCN date updated at end of shift
let nurseCCNdatesToUpdate = [];
// Holds the hour number sent for local machine to avoid issues with with timezone
let localMachineHour = 0;

const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use('/public', express.static(__dirname + '/public'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hey! You got in touch with the server!')
})

app.get('/nurse_data', (req, res) => {
    dbConnection.changeDB('ccn');
    dbConnection.pullNurses((err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

app.get('/nurse_sched', (req, res) => {
    dbConnection.changeDB('ccn')
    dbConnection.pullNurseDate((err, data) => {
        if (err) throw err;
        res.send(data);
    })
    console.log('sched sent');
})
 
app.post('/load_db', (req, res) => {
    let nurseInfo = req.body;
    dbConnection.runQuery(`INSERT INTO nurses VALUES ('${nurseInfo.id}', '${nurseInfo.firstName}', '${nurseInfo.lastName}', '${nurseInfo.clinicalLadder}', '${nurseInfo.skills}', '${nurseInfo.lastDateInCCN}', '${nurseInfo.hireDate}', '${nurseInfo.seniority}')`);
    console.log(`${nurseInfo.firstName} has been added to the database`);
    res.sendStatus(200);    
})

app.post('/load_schedule', (req, res) => {
    let schInfo = req.body;
    dbConnection.runQuery(`UPDATE schedule SET shift='${schInfo.shift}', daysWorking='${schInfo.daysWorking}' WHERE nurseID='${schInfo.id}'`);
    console.log('Schedule added');
    res.sendStatus(200);
})

app.post('/add_nurse', urlencodedParser, (req, res) => {
    let nurseInfo = req.body;
    dbConnection.runQuery(`INSERT INTO nurses (nurseID, firstName, lastName, clinicalLadder, skills, lastDateInCCN, hireDate, seniority) VALUES ('${nurseInfo.id}', '${nurseInfo.firstName}', '${nurseInfo.lastName}', '${nurseInfo.clinicalLadder}', '${nurseInfo.skills}', '${nurseInfo.lastDateInCCN}', '${nurseInfo.hireDate}', '${nurseInfo.seniority}')`);
    dbConnection.runQuery(`INSERT INTO schedule (nurseID, shift, daysWorking) VALUES ('${nurseInfo.id}', '${nurseInfo.shift}', '${nurseInfo.daysWorking}')`)
    console.log(`${nurseInfo.firstName} has been added to the database`);
    console.log(nurseInfo);
    res.sendStatus(200);
})

app.post('/delete_nurse', urlencodedParser, (req, res) => {
    let nurseInfo = req.body;
    for(i=0; i<nurseInfo.length; i++) {
        dbConnection.runQuery(`DELETE FROM nurses WHERE nurseID = '${nurseInfo[i]}';`);
        dbConnection.runQuery(`DELETE FROM schedule WHERE nurseID = '${nurseInfo[i]}';`)
    };
    console.log(`nurses have been deleted from the databse`)
    res.sendStatus(200);
})

app.post('/update_nurse', urlencodedParser, (req, res) => {
    let nurseInfo = req.body;
    dbConnection.runQuery(`UPDATE nurses
    SET
        firstName = '${nurseInfo.firstName}',
        lastName = '${nurseInfo.lastName}',
        clinicalLadder = '${nurseInfo.clinicalLadder}',
        skills = '${nurseInfo.skills}',
        lastDateInCCN = '${nurseInfo.lastDateInCCN}',
        hireDate = '${nurseInfo.hireDate}'
    WHERE nurseID = '${nurseInfo.id}'`);
    dbConnection.runQuery(`UPDATE schedule
    SET
        shift = '${nurseInfo.shift}',
        daysWorking = '${nurseInfo.daysWorking}'
    WHERE nurseID = '${nurseInfo.id}'`);
    console.log(`nurse was updated`);
    res.sendStatus(200);
})

app.post('/update_ccnDate', urlencodedParser, (req, res) => {
    nurseCCNdatesToUpdate.push(req.body);
    console.log(nurseCCNdatesToUpdate);
    // needed to add 1 to the hour from local machine otherwise CCN date would update an hour late 
    localMachineHour = nurseCCNdatesToUpdate[0].hour + 1;
    res.sendStatus(200);
})

app.post('/move_nurse', (req, res) => {
    let nursesToMove = req.body;
    dbConnection.runQuery(`UPDATE nurses SET moved=true WHERE nurseID='${nursesToMove.nurseID}'`)
    console.log('Nurse moved');
    res.sendStatus(200);
})

app.listen(process.env.PORT || 5000, () => {
    dbConnection.startConnection();
    console.log(`This server is listening`);
})

// At 7 AM or 7 PM (end of shift for nurses) the CCN date for nurses in the nurseCCNdatesToUpdate array are updated to the current date
let dateUpdateFunction = () => {
    if(nurseCCNdatesToUpdate.length != 0 && (localMachineHour === 7 || localMachineHour === 19)) {
        nurseCCNdatesToUpdate.forEach(el => {
            dbConnection.runQuery(`UPDATE nurses SET lastDateInCCN='${el.lastDateInCCN}' WHERE nurseID='${el.nurseID}'`);
            console.log(`${el.firstName}'s CCN date was updated`)    
        });
        nurseCCNdatesToUpdate = [];    
    };
    localMachineHour++;
    // calls this function once an hour
    setTimeout(dateUpdateFunction, 3600000);
}

dateUpdateFunction();