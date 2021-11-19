const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;

  //data for report
  let reportId = 123456789;
  let reportType = 'Test Type';
  let reportDetails = 'Test Report Details';
  let reportDesc = 'Test Report Description';
  let reportStatus = 'Test Report Status';
  let profileID = 987654321;

  beforeEach(async () => {
    //create mock mysql tables
    let createTestTemplateTableSQL =
      "CREATE TABLE `testViewReport` ( `id` INT(9) ZEROFILL , `reportType` VARCHAR(30) , `reportDetails` VARCHAR(60) , `reportDesc` VARCHAR(250) , `reportStatus` VARCHAR(30) , `profileID` INT(9) ZEROFILL NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

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

  it("Test Querying Report from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testViewReport table with test data
      let insertSQL = `INSERT INTO testViewReport (id,  reportType, reportDetails, reportDesc, reportStatus, profileID) VALUES (${reportId}, '${reportType}', '${reportDetails}', '${reportDesc}', '${reportStatus}', ${profileID});`;
      insertQueries.push(connection.query(insertSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testViewReport");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(reportId);
      expect(rows[0].reportType).toBe(reportType);
      expect(rows[0].reportDetails).toBe(reportDetails);
      expect(rows[0].reportDesc).toBe(reportDesc);
      expect(rows[0].reportStatus).toBe(reportStatus);
      expect(rows[0].profileID).toBe(profileID);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testViewReport`";
      await connection.query(dropTestTemplateTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestTemplateTableSQL = "DROP TABLE IF EXISTS `testViewReport`";
    await connection.query(dropTestTemplateTableSQL);
    await connection.end();
  });
});
 
