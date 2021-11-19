const { createPool } = require("mysql2/promise");
const faker = require("faker");
const { date } = require("faker");

describe("Database Info Tests", () => {
  let connection;
  let artType = 'Flat Color';

  //data for art 1
  let id = 123456789;
  let artPrice = '10.00';
  let artDesc = 'Test Icon Description';
  let artURL = 'Test Icon URL';
  let date = '2019-05-14T11:01:58.135Z';

  //data for art 2
  let id2 = 987654321;
  let artPrice2 = '20.00';
  let artDesc2 = 'Test Icon Description 2';
  let artURL2 = 'Test Icon URL 2';
  let date2 = '2020-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestTemplateTableSQL =
      "CREATE TABLE `testTemplateModify` ( `id` INT(9) ZEROFILL , `artType` VARCHAR(30) NOT NULL , `artPrice` DECIMAL(5,2) NOT NULL , `artDesc` VARCHAR(30000) NOT NULL , `artExURL` VARCHAR(250) , `postDate` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestTemplateTableSQL);
  });

  it("Test Querying Template for FlatColor from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testProfile table with art 1
      let insertSQL1 = `INSERT INTO testTemplateModify (id,  artType, artPrice, artDesc, artExURL, postDate) VALUES (${id}, '${artType}', '${artPrice}', '${artDesc}', '${artURL}', '${date}');`;
      insertQueries.push(connection.query(insertSQL1));

      //populate testProfile table with art 2
      let insertSQL2 = `INSERT INTO testTemplateModify (id,  artType, artPrice, artDesc, artExURL, postDate) VALUES (${id2}, '${artType}', '${artPrice2}', '${artDesc2}', '${artURL2}', '${date2}');`;
      insertQueries.push(connection.query(insertSQL2));
      
      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testTemplateModify WHERE artType = 'Flat Color' ORDER BY postDate DESC;");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 2)
      expect(rows.length).toBe(2);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(id2);
      expect(rows[0].artType).toBe(artType);
      expect(rows[0].artPrice).toBe(artPrice2);
      expect(rows[0].artDesc).toBe(artDesc2);
      expect(rows[0].artExURL).toBe(artURL2);
      expect(rows[0].postDate).toBe(date2);

      expect(rows[1].id).toBe(id);
      expect(rows[1].artType).toBe(artType);
      expect(rows[1].artPrice).toBe(artPrice);
      expect(rows[1].artDesc).toBe(artDesc);
      expect(rows[1].artExURL).toBe(artURL);
      expect(rows[1].postDate).toBe(date);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testTemplateModify`";
      await connection.query(dropTestTemplateTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testTemplateModify`";
    await connection.query(dropTestTemplateTableSQL);
    await connection.end();
  });
});
 
