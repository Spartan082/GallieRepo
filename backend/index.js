const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '#Gallie143',
    database: 'Galliedb'
});

app.get("/homepage", (req, res) => {
    const sqlSelect =
        "SELECT * FROM Post";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});