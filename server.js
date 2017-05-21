const express = require('express');
const sensor = require('node-dht-sensor');
const O = require('rxjs/Observable').Observable;
const mysql = require('mysql');
const moment = require('moment');
require('rxjs/add/observable/interval');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Caval0n12',
  database : 'house_conditions',
});
connection.connect();


const app = express();

process.env.PWD = process.cwd();

app.get('/', (req, res) => {
    res.sendFile(`${process.env.PWD}/index.html`)
})

app.get('/getStats', (req, res) => {
    const date = moment().format('YYDDD');
    connection.query(`SELECT * FROM conditions WHERE date = "${date}`, (err, results, fields) => {
        if (err) {
            throw err
        } else {
            res.send({ results, fields })
        }

    })
})

const tempInterval = O.interval(300000)

tempInterval.subscribe(() => {
    let temp;
    let humidity;
    sensor.read(22, 4, function(err, temperature, humidity) {
        if (!err) {
            temp = temperature.toFixed(1)
            humidity = humidity.toFixed(1)
        }
    });
    const date = moment().format('YYDDD');
    const time = moment().format('h:mm').toString();
    connection.query(`INSERT INTO conditions (date, hour_min, temperature, humidity) 
    VALUES ("${date}", "${time}", "${temp}", "${humidity}")`, (err, results, fields) => {
        if (err) {
            throw err
        }
    })
})

app.listen(8080, () => {
    console.log('app is listening on port 80')
})