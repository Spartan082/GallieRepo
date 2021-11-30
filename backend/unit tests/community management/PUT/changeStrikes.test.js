const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  
  //data for profile 1
  let id = 123456789;
  let email = "testemail@gmail.com";
  let username = "Test User";
  let password = "password";
  let status = "Artist";
  let strikes = 1;
  let settings = "Default";

  let newStrikes = 2;

  beforeEach(async () => {
    //create mock mysql tables
    let createTestProfileTableSQL =
      "CREATE TABLE `testChangeStrikes` ( `id` INT(9) ZEROFILL PRIMARY KEY , `email` VARCHAR(30) UNIQUE NOT NULL , `username` VARCHAR(30) UNIQUE NOT NULL , `password` VARCHAR(30) NOT NULL , `status` VARCHAR(30) NOT NULL , `strikes` INT(1) NOT NULL , `settings` VARCHAR(30) NOT NULL) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestProfileTableSQL);
  });

  it("Test Change Strikes from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with profile 1
      let insertProfileSQL = `INSERT INTO testChangeStrikes (id, email, username, password, status, strikes, settings) VALUES (${id}, '${email}', '${username}', '${password}', '${status}', ${strikes}, '${settings}');`;
      insertQueries.push(connection.query(insertProfileSQL));

      let updateProfileSQL = `UPDATE testChangeStrikes SET strikes = '` + newStrikes + `' WHERE id = '` + id + `'`;
      insertQueries.push(connection.query(updateProfileSQL));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testChangeStrikes WHERE id = '" + id + "' AND strikes = '" + newStrikes + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(1); 

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].strikes).toBe(newStrikes);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testChangeStrikes`";
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testChangeStrikes`";
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});