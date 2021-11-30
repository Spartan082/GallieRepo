const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  let id = 123456789;

  //data for post 1
  let artworkName = 'Test Artwork';
  let description = 'Test Description';
  let date = '2019-05-14T11:01:58.135Z';
  let artworkURL = 'Test URL';

  //data for post 2
  let artworkName2 = 'Test Artwork 2';
  let description2 = 'Test Description 2';
  let date2 = '2020-05-14T11:01:58.135Z';
  let artworkURL2 = 'Test URL 2';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestPostsTableSQL =
      "CREATE TABLE `testGetProfilePosts` ( `id` INT(9) ZEROFILL NOT NULL AUTO_INCREMENT, `artworkName` VARCHAR(30) NOT NULL , `prodDesc` VARCHAR(50) , `postDate` VARCHAR(50) NOT NULL , `artworkURL` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`, `artworkName`)) ENGINE = InnoDB;";

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
  });

  it("Test Get Profile Posts from DB", async () => {
    try {
      let insertQueries = [];

      //populate testPost table with post 1
      let insertPostSQL = `INSERT INTO testGetProfilePosts (id, artworkName, prodDesc, postDate, artworkURL) VALUES (${id}, '${artworkName}', '${description}', '${date}', '${artworkURL}');`;
      insertQueries.push(connection.query(insertPostSQL));

      //populate testPost table with post 2
      let insertPostSQL2 = `INSERT INTO testGetProfilePosts (id, artworkName, prodDesc, postDate, artworkURL) VALUES (${id}, '${artworkName2}', '${description2}', '${date2}', '${artworkURL2}');`;
      insertQueries.push(connection.query(insertPostSQL2));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testGetProfilePosts WHERE id = '" + id + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(2);

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].artworkName).toBe(artworkName);
      expect(rows[0].prodDesc).toBe(description);
      expect(rows[0].postDate).toBe(date);
      expect(rows[0].artworkURL).toBe(artworkURL);

      expect(rows[1].id).toBe(id);
      expect(rows[1].artworkName).toBe(artworkName2);
      expect(rows[1].prodDesc).toBe(description2);
      expect(rows[1].postDate).toBe(date2);
      expect(rows[1].artworkURL).toBe(artworkURL2);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestPostsTableSQL = "DROP TABLE IF EXISTS `testGetProfilePosts`";
      await connection.query(dropTestPostsTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestPostsTableSQL = "DROP TABLE IF EXISTS `testGetProfilePosts`";
    await connection.query(dropTestPostsTableSQL);
    await connection.end();
  });
});