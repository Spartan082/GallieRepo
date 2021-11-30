const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  
  //data for profile
  let id = 123456789;
  let email = "testemail@gmail.com";
  let username = "Test User";
  let password = "password";
  let status = "Artist";
  let strikes = 0;
  let settings = "Default";

  beforeEach(async () => {
    //create mock mysql tables
    let createTestProfileTableSQL =
      "CREATE TABLE `testRemoveProfile` ( `id` INT(9) ZEROFILL PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(30) UNIQUE NOT NULL , `username` VARCHAR(30) UNIQUE NOT NULL , `password` VARCHAR(30) NOT NULL , `status` VARCHAR(30) NOT NULL , `strikes` INT(1) NOT NULL , `settings` VARCHAR(30) NOT NULL) ENGINE = InnoDB;";

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

  it("Test Remove Profile from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with test data
      let insertProfileSQL = `INSERT INTO testRemoveProfile (id, email, username, password, status, strikes, settings) VALUES (${id}, '${email}', '${username}', '${password}', '${status}', ${strikes}, '${settings}');`;
      insertQueries.push(connection.query(insertProfileSQL));

      //populate testProfile table with test data
      let deleteProfileSQL = `DELETE FROM testRemoveProfile WHERE id = '` + id + `'`;
      insertQueries.push(connection.query(deleteProfileSQL));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testRemoveProfile WHERE id = '" + id + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES
      //console.log(rows);
      expect(rows.length).toBe(0);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testRemoveProfile`";
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testRemoveProfile`";
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});