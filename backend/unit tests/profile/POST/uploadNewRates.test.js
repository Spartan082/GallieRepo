const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  
  //data for artist
  let id = 123456789;
  let category = 'icon';
  let icon = '10.00';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestProfileTableSQL =
      "CREATE TABLE `testUploadNewRates` ( `id` INT(9) ZEROFILL PRIMARY KEY , `icon` DECIMAL(8,2) , `sketch` DECIMAL(8,2) , `flatColor` DECIMAL(8,2) , `lineart` DECIMAL(8,2) , `shaded` DECIMAL(8,2) , `logo` DECIMAL(8,2)) ENGINE = InnoDB;";

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

  it("Test Upload New Rates from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with test data
      let insertArtistSQL = `INSERT INTO testUploadNewRates (id, ` + category + `) VALUES ('${id}', '${icon}' )`;
      insertQueries.push(connection.query(insertArtistSQL));

      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testUploadNewRates WHERE id = '" + id + "' AND " + category + " = '" + icon + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(1);

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].icon).toBe(icon);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testUploadNewRates`";
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testUploadNewRates`";
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});