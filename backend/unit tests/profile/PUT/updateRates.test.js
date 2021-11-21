const { createPool } = require("mysql2/promise");
const faker = require("faker");

describe("Database Tests", () => {
  let connection;
  
  //data for artist
  let id = 123456789;
  let icon = '10.00';
  let sketch = '25.50';
  let flatColor = '5.00';
  let lineart = '15.99';
  let shaded = '30.54';
  let logo = '2.50';

  let category = 'sketch';
  let newSketch = '10.50'

  beforeEach(async () => {
    //create mock mysql tables
    let createTestProfileTableSQL =
      "CREATE TABLE `testUpdateRates` ( `id` INT(9) ZEROFILL PRIMARY KEY , `icon` DECIMAL(8,2) , `sketch` DECIMAL(8,2) , `flatColor` DECIMAL(8,2) , `lineart` DECIMAL(8,2) , `shaded` DECIMAL(8,2) , `logo` DECIMAL(8,2)) ENGINE = InnoDB;";

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

  it("Test Update Rates from DB", async () => {
    try {
      let insertQueries = [];

      //populate testProfile table with test data
      let insertArtistSQL = `INSERT INTO testUpdateRates (id, icon, sketch, flatColor, lineart, shaded, logo) VALUES (${id}, '${icon}', '${sketch}', '${flatColor}', '${lineart}', ${shaded}, '${logo}');`;
      insertQueries.push(connection.query(insertArtistSQL));

       //populate testProfile table with test data
       let updateArtistSQL = `UPDATE testUpdateRates SET ` + category + ` = '` + newSketch + `' WHERE id = '` + id + `'`;
       insertQueries.push(connection.query(updateArtistSQL));
 
      await Promise.all(insertQueries);

      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testUpdateRates WHERE id = '" + id + "' AND " + category + " = '" + newSketch + "'");

      //CHECK THAT LENGTH OF RESPONSE MATCHES NUMBER OF DB ENTRIES (should be 1)
      //console.log(rows);
      expect(rows.length).toBe(1);

      //CHECK DATA THAT IS RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].icon).toBe(icon);
      expect(rows[0].sketch).toBe(newSketch);
      expect(rows[0].flatColor).toBe(flatColor);
      expect(rows[0].lineart).toBe(lineart);
      expect(rows[0].shaded).toBe(shaded);
      expect(rows[0].logo).toBe(logo);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testUpdateRates`";
      await connection.query(dropTestProfileTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestProfileTableSQL = "DROP TABLE IF EXISTS `testUpdateRates`";
    await connection.query(dropTestProfileTableSQL);
    await connection.end();
  });
});