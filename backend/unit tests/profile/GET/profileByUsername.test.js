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
      "CREATE TABLE `testProfileByUsername` ( `id` INT(9) ZEROFILL PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(30) UNIQUE NOT NULL , `username` VARCHAR(30) UNIQUE NOT NULL , `password` VARCHAR(30) NOT NULL , `status` VARCHAR(30) NOT NULL , `strikes` INT(1) NOT NULL , `settings` VARCHAR(30) NOT NULL) ENGINE = InnoDB;";

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

  it("Test Querying Profile by Username from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with test data
      let insertProfileSQL = `INSERT INTO testProfileByUsername (id, email, username, password, status, strikes, settings) VALUES (${id}, '${email}', '${username}', '${password}', '${status}', ${strikes}, '${settings}');`;
      insertQueries.push(connection.query(insertProfileSQL));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testProfileByUsername WHERE username = '" + username + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(1);

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].email).toBe(email);
      expect(rows[0].username).toBe(username);
      expect(rows[0].password).toBe(password);
      expect(rows[0].status).toBe(status);
      expect(rows[0].strikes).toBe(strikes);
      expect(rows[0].settings).toBe(settings);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testProfileByUsername`";
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testProfileByUsername`";
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});