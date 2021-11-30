const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  let id = 123456789;

  //data for post
  let artworkName = 'Test Artwork';
  let description = 'Test Description';
  let date = '2019-05-14T11:01:58.135Z';
  let artworkURL = 'Test URL';
  
  //data for profile
  let email = "testemail@gmail.com";
  let username = "Test User";
  let password = "password";
  let status = "Artist";
  let strikes = 0;
  let settings = "Default";

  beforeEach(async () => {
    //create mock mysql tables
    let createTestPostsTableSQL =
      "CREATE TABLE `testAllPosts` ( `id` INT(9) ZEROFILL NOT NULL AUTO_INCREMENT, `artworkName` VARCHAR(30) NOT NULL , `prodDesc` VARCHAR(50) , `postDate` VARCHAR(50) NOT NULL , `artworkURL` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`, `artworkName`)) ENGINE = InnoDB;";

    let createTestProfileTableSQL =
      "CREATE TABLE `testProfile` ( `id` INT(9) ZEROFILL PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(30) UNIQUE NOT NULL , `username` VARCHAR(30) UNIQUE NOT NULL , `password` VARCHAR(30) NOT NULL , `status` VARCHAR(30) NOT NULL , `strikes` INT(1) NOT NULL , `settings` VARCHAR(30) NOT NULL) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestPostsTableSQL);
    await connection.query(createTestProfileTableSQL);
  });

  it("Test Querying All Posts from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with test data
      let insertProfileSQL = `INSERT INTO testProfile (id, email, username, password, status, strikes, settings) VALUES (${id}, '${email}', '${username}', '${password}', '${status}', ${strikes}, '${settings}');`;
      insertQueries.push(connection.query(insertProfileSQL));

      //populate testPost table with test data
      let insertPostSQL = `INSERT INTO testAllPosts (id, artworkName, prodDesc, postDate, artworkURL) VALUES (${id}, '${artworkName}', '${description}', '${date}', '${artworkURL}');`;
      insertQueries.push(connection.query(insertPostSQL));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testAllPosts,testProfile WHERE testAllPosts.id = testProfile.id " 
      + "ORDER BY testAllPosts.postDate DESC");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(1);

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].artworkName).toBe(artworkName);
      expect(rows[0].prodDesc).toBe(description);
      expect(rows[0].postDate).toBe(date);
      expect(rows[0].artworkURL).toBe(artworkURL);
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
      let droptestAllPostssTableSQL = "DROP TABLE IF EXISTS `testAllPosts`";
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testProfile`";
      await connection.query(dropTestPostsTableSQL);
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestPostsTableSQL = "DROP TABLE IF EXISTS `testAllPosts`";
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testProfile`";
    await connection.query(dropTestPostsTableSQL);
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});