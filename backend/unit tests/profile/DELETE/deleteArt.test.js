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

  beforeEach(async () => {
    //create mock mysql tables
    let createTestPostsTableSQL =
      "CREATE TABLE `testDeleteArtwork` ( `id` INT(9) ZEROFILL NOT NULL AUTO_INCREMENT, `artworkName` VARCHAR(30) NOT NULL , `prodDesc` VARCHAR(50) , `postDate` VARCHAR(50) NOT NULL , `artworkURL` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`, `artworkName`)) ENGINE = InnoDB;";

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

  it("Test Deleting from Post from DB", async () => {
    try {
      let queries = [];

      //populate testDeleteArtwork table with test data
      let insertPostSQL = `INSERT INTO testDeleteArtwork (id, artworkName, prodDesc, postDate, artworkURL) VALUES (${id}, '${artworkName}', '${description}', '${date}', '${artworkURL}');`;
      queries.push(connection.query(insertPostSQL));

      let deletePostSQL = `DELETE FROM testDeleteArtwork WHERE id = '` + id + `' AND artworkName = '` + artworkName + `'`;
      queries.push(connection.query(deletePostSQL));

      await Promise.all(queries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testDeleteArtwork WHERE id = '" + id + "' and artworkName = '" + artworkName + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 0 because entry was deleted)
      expect(rows.length).toBe(0);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestPostsTableSQL = "DROP TABLE IF EXISTS `testDeleteArtwork`";
      await connection.query(dropTestPostsTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestPostsTableSQL = "DROP TABLE IF EXISTS `testDeleteArtwork`";
    await connection.query(dropTestPostsTableSQL);
    await connection.end();
  });
});