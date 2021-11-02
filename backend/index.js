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

app.get("/ViewRequest", (req, res) => {
  console.log(req.query.artistUsername);

  const sqlSelect = "SELECT * FROM Request WHERE artistUsername = '" + req.query.artistUsername + "'";
  db.query(sqlSelect, (err, result) => {
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

app.post('/CreateRequest', (req, res) => {
  // store all the post input data
  const id = req.body.requestID;
  const customerEmail = req.body.customerEmail;
  const artistUsername = req.body.artistUsername;
  const prodName = req.body.prodName;
  const initialPrice = req.body.initialPrice;
  const prodDesc = req.body.prodDesc;
 
  // insert post data into post table
  var sql = "INSERT INTO Request (requestID, customerEmail, artistUsername, prodName, initialPrice, prodDesc) VALUES (?, ?, ?, ?, ?, ?)";
  console.log(sql);
  db.query(sql, [id, customerEmail, artistUsername, prodName, initialPrice, prodDesc], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully uploaded."); 
          res.send(result);
      }
  });
});

app.post('/CreateInvoice', (req, res) => {
  // store all the post input data
  const id = req.body.invoiceID;
  const artistEmail = req.body.artistEmail;
  const customerEmail = req.body.customerEmail;
  const prodCost = req.body.prodCost;
  const prodDesc = req.body.prodDesc;
  const paymentType = req.body.paymentType;
  const paymentStatus = 'Pending';
 
  // insert post data into post table
  var sql = "INSERT INTO Invoice (invoiceID, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully uploaded."); 
          res.send(result);
      }
  });
});

//register account
// --------------------------------------------------------------------
app.post("/register", (req, res) => {
  const id = req.body.profileID;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const status = req.body.status;

 // insert  data into profile table
 var sql = "INSERT INTO Profile (profileID, email, username, password, status, strikes, settings) VALUES (?, ?, ?, ?, ?, ?, ?)";
 db.query(sql, [id, email, username, password, status, 0, 'Default'], (err, result) => { 
     if (err) {
         throw err;
     } else {
         res.send(result);
         console.log("Registration successfully uploaded."); 
     }
 });
});

//login
//-------------------------------------------------------------------------------------------------------------
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM Profile WHERE username = ? AND password = ?";
 
 db.query(sqlSelect, [ username, password ], (err, result) => { 
  if (err) {
    throw err;
  } 
  if (result.length > 0) {
    res.send(result);
    console.log("Login was successful."); 

  }
  else {
    res.send({message: "Wrong username/password combination"}) ;
    console.log("Incorrect");
  }
});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});