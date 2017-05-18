const express = require('express');

const app = express();

process.env.PWD = process.cwd();

app.get('/', (req, res) => {
    res.sendFile(`${process.env.PWD}/index.html`)
})

app.listen(80, () => {
    console.log('app is listening on port 80')
})