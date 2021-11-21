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
  methods: ["GET", "POST", "DELETE", "PUT"],
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
    // cookie expires in 1 hour after made
    expires: 1 * 3600 * 1000, 
    //60 * 60 * 24,
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

/* Template Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.get("/template/icon", (req, res) => {
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
app.get("/template/sketch", (req, res) => {
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

app.get("/template/flatcolor", (req, res) => {
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
app.get("/template/lineart", (req, res) => {
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
app.get("/template/shaded", (req, res) => {
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
app.get("/template/logo", (req, res) => {
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

app.get("/ViewReport", (req, res) => {
  const sqlSelect = "SELECT * FROM ReportType ORDER BY postDate DESC";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewStrikedReports", (req, res) => {
  const sqlSelect = "SELECT * FROM ReportType WHERE profileID = '" + req.query.profileID + "' and reportStatus = 'Striked' ORDER BY postDate DESC";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewAllRequests", (req, res) => {
  const sqlSelect = "SELECT * FROM Request ORDER BY postDate DESC";
  db.query(sqlSelect, (err, result) => {
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

app.get("/ViewAllStrikedAccounts", (req, res) => {
  const sqlSelect = "SELECT * FROM Profile WHERE strikes >= 1";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
  });
});

app.get("/ViewAllInvoices", (req, res) => {
  const sqlSelect = "SELECT * FROM Invoice ORDER BY postDate DESC";
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

app.get("/ViewSpecificReport", (req, res) => {
  const sqlSelect = "SELECT * FROM ReportType WHERE reportID = '" + req.query.reportID + "'";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          console.log(result);
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

app.get("/ViewArtistRates", (req, res) => {
  const sqlSelect = "SELECT * FROM Artist WHERE profileID = '" + req.query.profileID + "';";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
        } else {
          console.log(sqlSelect);
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

app.get("/GetProfilePosts", (req, res) => {
  const sqlSelect = "SELECT * FROM Post WHERE ProfileID = '" + req.query.profileID + "'";
  db.query(sqlSelect, (err, result) => {
      //console.log(result);
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
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

//logout
//-------------------------------------------------------------------------------------------------------------
app.get('/logout',(req, res) => {
  if (req.session.user){
   res.send({loggedIn: false});
  } else{
    res.send({loggedIn: true, user: req.session.user});
    }
  });

app.get("/GetNumStrikes", (req, res) => {
  const sqlSelect = "SELECT strikes FROM Profile WHERE profileID = '" + req.query.profileID +"';";
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

/* Post Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
  app.get("/posts", (req, res) => {
    const sqlSelect = "SELECT * FROM Post,Profile WHERE Post.profileID = Profile.profileID " 
        + "ORDER BY Post.postDate DESC";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
    });
  });

app.get("/postByName", (req, res) => {
  const sqlSelect = "SELECT * FROM Post WHERE artworkName = '" + req.query.artworkName + "'";
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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
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

/* Report Queries */
/* ------------------------------------------------------------------------------------------------------------------------------ */
app.post('/uploadReport', (req, res) => {
  // store all the post input data
  const id = req.body.reportID;
  const type = req.body.reportType;
  const details = req.body.reportDetails;
  const desc = req.body.reportDesc;
  const status = req.body.reportStatus;
  const date = req.body.date;
  const profileId = req.body.profileId;
 
  // insert post data into post table
  var sql = "INSERT INTO ReportType (reportID, reportType, reportDetails, reportDesc, reportStatus, postDate, profileID) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, type, details, desc, status, date, profileId], (err, result) => { 
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

app.post('/UploadNewRates', (req, res) => {
  var sql = "INSERT INTO Artist (profileID, " + req.body.catagory + ") VALUES (?, ?)";
  console.log(sql);
  db.query(sql, [req.body.profileID, req.body.price], (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log(sql);
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



//logout
//-------------------------------------------------------------------------------------------------------------
  app.post('/logout',(req,res) => {
    req.session.loggedin = false;
    req.session.destroy();
    res.clearCookie('userID'); 
    console.log("Cookie cleared");
    res.send({loggedIn: false});
    console.log("Logout successful");
    //res.redirect('/');
  });

app.put('/ChangeReportStatus', (req, res) => {
  var sql = "UPDATE ReportType SET reportStatus = '" + req.body.Status + "' WHERE reportID = '" + req.body.reportID + "'";
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

app.put('/ChangeStrikes', (req, res) => {
  var sql = "UPDATE Profile SET strikes = '" + req.body.strikes + "' WHERE profileID = '" + req.body.profileID + "'";
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

app.put('/UpdateRates', (req, res) => {
  var sql = "UPDATE Artist SET " + req.body.catagory + " = '" + req.body.price + "' WHERE profileID = '" + req.body.profileID + "'";
  console.log(sql);
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log(sql);
          console.log("Put data was successfully updated."); 
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

app.delete('/RemoveRequest', (req, res) => {
  // delete post data from post table
  var sql = "DELETE FROM Request WHERE " 
    + "requestID = '" + req.body.requestID + "'";
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log("Request data was successfully deleted."); 
          res.send(result);
      }
  });
});

app.delete('/RemoveProfile', (req, res) => {
  // delete post data from post table
  console.log(req.body.profileID);
  var sql = "DELETE FROM Profile WHERE profileID = '" + req.body.profileID + "'";
  db.query(sql, (err, result) => { 
      if (err) {
          throw err;
      } else {
          console.log(sql);
          console.log("Profile data was successfully deleted."); 
          res.send(result);
      }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});