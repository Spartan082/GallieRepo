const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;
  let artistEmail = 'testartistemail@gmail.com';

  //data for report 1
  let id = 123456789;
  let customerEmail = 'testcustomeremail@gmail.com';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let type = 'Test Type';
  let status = 'Test Status';
  let date = '2019-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestInvoicesTableSQL =
      "CREATE TABLE `testCreateInvoice` ( `id` INT(9) ZEROFILL , `artistEmail` VARCHAR(30) , `customerEmail` VARCHAR(30),  `prodCost` DECIMAL(8,2),  `prodDesc` VARCHAR(250) , `paymentType` VARCHAR(30) , `paymentStatus` VARCHAR(30) ,`postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestInvoicesTableSQL);
  });

  it("Test Posting to Invoice from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testCreateInvoice table with report 1
      let insertSQL1 = `INSERT INTO testCreateInvoice (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id}, '${artistEmail}', '${customerEmail}', '${price}}', '${prodDesc}', '${type}', '${status}', '${date}');`;
      insertQueries.push(connection.query(insertSQL1));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testCreateInvoice WHERE id = '" + id + "' AND artistEmail = '" + artistEmail + "' AND customerEmail = '" + customerEmail 
        + "' AND prodCost = '" + price + "' AND prodDesc = '" + prodDesc + "' AND paymentType = '" + type + "' AND paymentStatus = '" + status + "' AND postDate = '" + date + "' ORDER BY postDate DESC");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testCreateInvoice`";
      await connection.query(dropTestInvoicesTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testCreateInvoice`";
    await connection.query(dropTestInvoicesTableSQL);
    await connection.end();
  });
});
