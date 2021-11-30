const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;

  //data for report
  let reportId = 123456789;
  let reportType = 'Test Type';
  let reportDetails = 'Test Report Details';
  let reportDesc = 'Test Report Description';
  let reportStatus = 'Pending';
  let profileID = 987654321;

  let newStatus = "Submitted"

  beforeEach(async () => {
    //create mock mysql tables
    let createTestReportTableSQL =
      "CREATE TABLE `testChangeReportStatus` ( `id` INT(9) ZEROFILL , `reportType` VARCHAR(30) , `reportDetails` VARCHAR(60) , `reportDesc` VARCHAR(250) , `reportStatus` VARCHAR(30) , `profileID` INT(9) ZEROFILL NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestReportTableSQL);
  });

  it("Test Putting New Report Status from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testChangeReportStatus table with test data
      let insertSQL = `INSERT INTO testChangeReportStatus (id,  reportType, reportDetails, reportDesc, reportStatus, profileID) VALUES (${reportId}, '${reportType}', '${reportDetails}', '${reportDesc}', '${reportStatus}', ${profileID});`;
      insertQueries.push(connection.query(insertSQL));

      let updateSQL = `UPDATE testChangeReportStatus SET reportStatus = '` + newStatus + `' WHERE id = '` + reportId + `'`;
      insertQueries.push(connection.query(updateSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testChangeReportStatus WHERE id = '" + reportId + "'");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(reportId);
      expect(rows[0].reportType).toBe(reportType);
      expect(rows[0].reportDetails).toBe(reportDetails);
      expect(rows[0].reportDesc).toBe(reportDesc);
      expect(rows[0].reportStatus).toBe(newStatus);
      expect(rows[0].profileID).toBe(profileID);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestReportTableSQL = "DROP TABLE IF EXISTS `testChangeReportStatus`";
      await connection.query(dropTestReportTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestReportTableSQL = "DROP TABLE IF EXISTS `testChangeReportStatus`";
    await connection.query(dropTestReportTableSQL);
    await connection.end();
  });
});
 
