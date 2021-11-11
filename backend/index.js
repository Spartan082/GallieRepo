const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const path = require("path");
const app = express();
const PORT = 8000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds =10; 

//app.use(cors());

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
})
);

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(session({
  key: "userID",
  secret: "gallieUserLog",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // cookie expires in 24 hours after made
    expires: 60 * 60 * 24,
  },
}))

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
  const sqlSelect = "SELECT * FROM Request WHERE artistUsername = '" + req.query.artistUsername + "' ORDER BY postDate DESC";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewInvoice", (req, res) => {
  const sqlSelect = "SELECT * FROM Invoice WHERE artistEmail = '" + req.query.email + "' ORDER BY postDate DESC";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/CheckVariable", (req, res) => {
  const sqlSelect = "SELECT COUNT(1) FROM " + req.query.variableTable + "  WHERE " + req.query.variableName + " = '" + req.query.variable + "'";
  console.log(sqlSelect);
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewSpecificRequest", (req, res) => {
  const sqlSelect = "SELECT * FROM Request WHERE requestID = '" + req.query.requestID + "'";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewSpecificInvoice", (req, res) => {
  const sqlSelect = "SELECT * FROM Invoice WHERE invoiceID = '" + req.query.invoiceID + "'";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewPendingInvoice", (req, res) => {
  const sqlSelect = "SELECT * FROM Invoice WHERE paymentStatus = 'Pending' ORDER BY postDate DESC;";
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

app.get("/CheckStatus", (req, res) => {
  const sqlSelect = "SELECT paymentStatus FROM Invoice WHERE invoiceID = '" + req.query.invoiceID + "'";
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

/* Report Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.post('/uploadReport', (req, res) => {
  // store all the post input data
  const id = req.body.reportID;
  const type = req.body.reportType;
  const details = req.body.reportDetails;
  const desc = req.body.reportDesc;
  const status = req.body.reportStatus;
  const profileId = req.body.profileId;
 
  // insert post data into post table
  var sql = "INSERT INTO ReportType (reportID, reportType, reportDetails, reportDesc, reportStatus, profileID) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, type, details, desc, status, profileId], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Report data was successfully uploaded."); 
          res.send(result);
      }
  });
});

/* Template Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
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

/* Request Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.post('/CreateRequest', (req, res) => {
  // store all the post input data
  const id = req.body.requestID;
  const customerEmail = req.body.customerEmail;
  const artistUsername = req.body.artistUsername;
  const prodName = req.body.prodName;
  const initialPrice = req.body.initialPrice;
  const prodDesc = req.body.prodDesc;
  const postDate = req.body.postDate;
 
  // insert post data into post table
  var sql = "INSERT INTO Request (requestID, customerEmail, artistUsername, prodName, initialPrice, prodDesc, postDate) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, customerEmail, artistUsername, prodName, initialPrice, prodDesc, postDate], (err, result) => { 
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
  const postDate = req.body.postDate;
 
  // insert post data into post table
  var sql = "INSERT INTO Invoice (invoiceID, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully uploaded."); 
          res.send(result);
      }
  });
});

app.post('/UpdatePendingInvoice', (req, res) => {
  // store all the post input data
  const id = req.body.invoiceID;
  const paymentStatus = 'Submitted';
 
  // insert post data into post table
  var sql = "UPDATE INVOICE SET paymentStatus = '" + paymentStatus + "' WHERE invoiceID = '" + id + "'";
  console.log(sql);
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Post data was successfully uploaded."); 
          res.send(result);
      }
  });
});

/* Profile Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.get("/profileByUsername", (req, res) => {
  const sqlSelect = "SELECT * FROM Profile WHERE username = '" + req.query.username + "'";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
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

  bcrypt.hash(password, saltRounds, (err, hash) => {


    if (err) {
      console.log(err);
    }
  
   // insert  data into profile table
   var sql = "INSERT INTO Profile (profileID, email, username, password, status, strikes, settings) VALUES (?, ?, ?, ?, ?, ?, ?)";
   db.query(sql, [id, email, username, hash, status, 0, 'Default'], (err, result) => { 
       if (err) {
           throw err;
       } 
       else {
           res.send(result);
           console.log("Registration successfully uploaded."); 
       }
    });
   });
  });

//login
//-------------------------------------------------------------------------------------------------------------
app.get('/login',(req, res) => {
  if (req.session.user){
    res.send({loggedIn: true, user: req.session.user});
  } else{
    res.send({loggedIn: false, user: req.session.user});
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM Profile WHERE username = ?";
 
  db.query(sqlSelect, [ username ], (err, result) => { 
    if (err) {
      throw err;
    }  
    if (result.length > 0) {
      bcrypt.compare(password,result[0].password, (error, response) => {
        if (response){
          req.session.user = result;
          console.log(req.session.user);
          req.session.loggedin = true;
          req.session.username = username;
          res.send(result);
          console.log("Login was successful."); 
        }
        else{
          res.send({message: "Wrong username/password combination"}) ;
        }
      });
      
  
    }
    else {
      res.send({message: "User does not exist"}) ;
      console.log("Incorrect");
    }
  });
  });

  app.get('/logout',(req,res) => {
    res.clearCookie('userID').send();
    req.logout();
    req.session.destroy();
    console.log("Logout successful");
    //res.redirect('/');
  });

app.put('/ChangeStatus', (req, res) => {
  var sql = "UPDATE Invoice SET paymentStatus = '" + req.body.Status + "' WHERE invoiceID = '" + req.body.invoiceID + "'";
  console.log(sql);
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Put data was successfully updated."); 
          res.send(result);
      }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});