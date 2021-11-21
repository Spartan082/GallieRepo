const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;
  let profileID = 987654321;

  //data for report 1
  let reportId = 123456789;
  let reportType = 'Test Type';
  let reportDetails = 'Test Report Details';
  let reportDesc = 'Test Report Description';
  let reportStatus = 'Striked';
  let date = '2019-05-14T11:01:58.135Z';

  //data for report 2
  let reportId2 = 234567891;
  let reportType2 = 'Test Type 2';
  let reportDetails2 = 'Test Report Details 2';
  let reportDesc2 = 'Test Report Description 2';
  let reportStatus2 = 'Striked';
  let date2 = '2020-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestReportTableSQL =
      "CREATE TABLE `testViewStrikedReports` ( `id` INT(9) ZEROFILL , `reportType` VARCHAR(30) , `reportDetails` VARCHAR(60) , `reportDesc` VARCHAR(250) , `reportStatus` VARCHAR(30) , postDate VARCHAR(30) , `profileID` INT(9) ZEROFILL NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

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

  it("Test Querying Striked Report from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testViewStrikedReports table with report 1
      let insertSQL1 = `INSERT INTO testViewStrikedReports (id,  reportType, reportDetails, reportDesc, reportStatus, postDate, profileID) VALUES (${reportId}, '${reportType}', '${reportDetails}', '${reportDesc}', '${reportStatus}', '${date}', ${profileID});`;
      insertQueries.push(connection.query(insertSQL1));

      //populate testViewStrikedReports table with report 2
      let insertSQL2 = `INSERT INTO testViewStrikedReports (id,  reportType, reportDetails, reportDesc, reportStatus, postDate, profileID) VALUES (${reportId2}, '${reportType2}', '${reportDetails2}', '${reportDesc2}', '${reportStatus2}', '${date2}', ${profileID});`;
      insertQueries.push(connection.query(insertSQL2));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testViewStrikedReports WHERE profileID = '" + profileID + "' and reportStatus = 'Striked' ORDER BY postDate DESC");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 2)
      expect(rows.length).toBe(2);

      //CHECK THE VALUES OF DATA RETURNED
      //report 2 should come first - descending date order
      expect(rows[0].id).toBe(reportId2);
      expect(rows[0].reportType).toBe(reportType2);
      expect(rows[0].reportDetails).toBe(reportDetails2);
      expect(rows[0].reportDesc).toBe(reportDesc2);
      expect(rows[0].reportStatus).toBe(reportStatus2);
      expect(rows[0].postDate).toBe(date2);
      expect(rows[0].profileID).toBe(profileID);

      expect(rows[1].id).toBe(reportId);
      expect(rows[1].reportType).toBe(reportType);
      expect(rows[1].reportDetails).toBe(reportDetails);
      expect(rows[1].reportDesc).toBe(reportDesc);
      expect(rows[1].reportStatus).toBe(reportStatus);
      expect(rows[1].postDate).toBe(date);
      expect(rows[1].profileID).toBe(profileID);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestReportTableSQL = "DROP TABLE IF EXISTS `testViewStrikedReports`";
      await connection.query(dropTestReportTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestReportTableSQL = "DROP TABLE IF EXISTS `testViewStrikedReports`";
    await connection.query(dropTestReportTableSQL);
    await connection.end();
  });
});
