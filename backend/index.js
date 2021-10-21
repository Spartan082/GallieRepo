const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const path = require("path");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend", "build")));

const db = mysql.createConnection({
    host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '#Gallie143',
    database: 'Galliedb'
});

app.get("/posts", (req, res) => {
    const sqlSelect = "SELECT * FROM Post,Profile WHERE Post.profileID = Profile.profileID " 
        + "ORDER BY Post.postDate DESC";
    db.query(sqlSelect, (err, result) => {
        //console.log(result);
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
    });
});

app.use(express.static('../frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});