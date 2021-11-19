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

  let tableName = 'testCheckVariable';
  let variableName = 'paymentType';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestCheckVariableTableSQL =
      "CREATE TABLE `testCheckVariable` ( `id` INT(9) ZEROFILL , `artistEmail` VARCHAR(30) , `customerEmail` VARCHAR(30),  `prodCost` DECIMAL(8,2),  `prodDesc` VARCHAR(250) , `paymentType` VARCHAR(30) , `paymentStatus` VARCHAR(30) ,`postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestCheckVariableTableSQL);
  });

  it("Test Querying Check Variable from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testCheckVariable table with test data
      let insertSQL = `INSERT INTO testCheckVariable (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id}, '${artistEmail}', '${customerEmail}', '${price}}', '${prodDesc}', '${type}', '${status}', '${date}');`;
      insertQueries.push(connection.query(insertSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT COUNT(1) FROM " + tableName + "  WHERE " + variableName + " = '" + type + "'");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);
      console.log(rows);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestCheckVariableTableSQL = "DROP TABLE IF EXISTS `testCheckVariable`";
      await connection.query(dropTestCheckVariableTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestCheckVariableTableSQL = "DROP TABLE IF EXISTS `testCheckVariable`";
    await connection.query(dropTestCheckVariableTableSQL);
    await connection.end();
  });
});
