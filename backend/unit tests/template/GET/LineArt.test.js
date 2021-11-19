const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;
  let id = 123456789;
  let artType = 'Lineart';
  let artPrice = '10.00';
  let artDesc = 'Test Icon Description';
  let artURL = 'Test Icon URL';
  let date = '2019-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestTemplateTableSQL =
      "CREATE TABLE `testTemplateLineArt` ( `id` INT(9) ZEROFILL , `artType` VARCHAR(30) NOT NULL , `artPrice` DECIMAL(5,2) NOT NULL , `artDesc` VARCHAR(30000) NOT NULL , `artExURL` VARCHAR(250) , `postDate` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

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
    
      //populate testProfile table with test data
      let insertSQL = `INSERT INTO testTemplateLineArt (id,  artType, artPrice, artDesc, artExURL, postDate) VALUES (${id}, '${artType}', '${artPrice}', '${artDesc}', '${artURL}', '${date}');`;
    
      insertQueries.push(connection.query(insertSQL));
      
      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testTemplateLineArt WHERE artType = 'Lineart' ORDER BY postDate DESC LIMIT 1;");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1 because the query limits it to latest entry)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].artType).toBe(artType);
      expect(rows[0].artPrice).toBe(artPrice);
      expect(rows[0].artDesc).toBe(artDesc);
      expect(rows[0].artExURL).toBe(artURL);
      expect(rows[0].postDate).toBe(date);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testTemplateLineArt`";
      await connection.query(dropTestTemplateTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testTemplateLineArt`";
    await connection.query(dropTestTemplateTableSQL);
    await connection.end();
  });
});
 
