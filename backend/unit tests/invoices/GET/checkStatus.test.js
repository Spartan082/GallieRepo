const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;

  //data for report
  let id = 123456789;
  let artistEmail = 'testartistemail@gmail.com';
  let customerEmail = 'testcustomeremail@gmail.com';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let type = 'Test Type';
  let status = 'Test Status';
  let date = '2019-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestCheckStatusTableSQL =
      "CREATE TABLE `testCheckStatus` ( `id` INT(9) ZEROFILL , `artistEmail` VARCHAR(30) , `customerEmail` VARCHAR(30),  `prodCost` DECIMAL(8,2),  `prodDesc` VARCHAR(250) , `paymentType` VARCHAR(30) , `paymentStatus` VARCHAR(30) ,`postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestCheckStatusTableSQL);
  });

  it("Test Querying Check Status from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testCheckStatus table with test data
      let insertSQL = `INSERT INTO testCheckStatus (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id}, '${artistEmail}', '${customerEmail}', '${price}}', '${prodDesc}', '${type}', '${status}', '${date}');`;
      insertQueries.push(connection.query(insertSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT paymentStatus FROM testCheckStatus WHERE id = '" + id + "'");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].paymentStatus).toBe(status);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestCheckStatusTableSQL = "DROP TABLE IF EXISTS `testCheckStatus`";
      await connection.query(dropTestCheckStatusTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestCheckStatusTableSQL = "DROP TABLE IF EXISTS `testCheckStatus`";
    await connection.query(dropTestCheckStatusTableSQL);
    await connection.end();
  });
});
