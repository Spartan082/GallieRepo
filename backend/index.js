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
    database: 'Galliedb',
    port: 3306,
    timezone: 'UTC'
});

/* Info Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.get("/info/icon", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Icon' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});
app.get("/info/sketch", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Sketch' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});
app.get("/info/flatcolor", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Flat Color' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});
app.get("/info/lineart", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Lineart' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});
app.get("/info/shaded", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Shaded' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});
app.get("/info/logo", (req, res) => {
  const sqlSelect = "SELECT * FROM Template WHERE artType = 'Logo' ORDER BY postDate DESC LIMIT 1;";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

/* Post Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
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

app.get("/postById", (req, res) => {
  console.log(req.query.profileID);
  console.log(req.query.artworkName);

  const sqlSelect = "SELECT * FROM Post WHERE profileID = " + req.query.profileID + " AND artworkName = '" + req.query.artworkName + "'";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
  });
});

app.post('/uploadArt', (req, res) => {
    // store all the post input data
    const id = req.body.profileID;
    const name = req.body.artworkName;
    const desc = req.body.prodDesc;
    const date = req.body.postDate;
    const image = req.body.artworkURL;
   
    // insert post data into post table
    var sql = "INSERT INTO Post (profileID, artworkName, prodDesc, postDate, artworkURL) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [id, name, desc, date, image], (err, result) => { 
        if (err) {
            throw err;
        } else {
            console.log("Post data was successfully uploaded."); 
            res.send(result);
        }
    });
});

app.delete('/deleteArt', (req, res) => {
  // delete post data from post table
  var sql = "DELETE FROM Post WHERE " 
    + "profileId = " + req.body.profileID
    + " AND artworkName = '" + req.body.artworkName + "'";
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully deleted."); 
          res.send(result);
      }
  });
});

app.post('/TemplateModify', (req, res) => {
  // store all the post input data
  const id = req.body.templateVersionID;
  const artType = req.body.artType;
  const artPrice = req.body.artPrice;
  const artDesc = req.body.artDescription;
  const image = req.body.artExURL;
  const date = req.body.postDate;
 
  // insert post data into post table
  var sql = "INSERT INTO Template (templateVersionID, artType, artPrice, artDesc, artExURL, postDate) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, artType, artPrice, artDesc, image, date], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully uploaded."); 
          res.send(result);
      }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});