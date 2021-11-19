const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection; 
  
  //data for report 1
  let id = 123456789;
  let artistEmail = 'testartistemail@gmail.com';
  let customerEmail = 'testcustomeremail@gmail.com';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let type = 'Test Type';
  let status = 'Pending';
  let date = '2019-05-14T11:01:58.135Z';

  let newStatus = "Submitted";

  beforeEach(async () => {
    //create mock mysql tables
    let createTestInvoicesTableSQL =
      "CREATE TABLE `testCreatePendingInvoices` ( `id` INT(9) ZEROFILL , `artistEmail` VARCHAR(30) , `customerEmail` VARCHAR(30),  `prodCost` DECIMAL(8,2),  `prodDesc` VARCHAR(250) , `paymentType` VARCHAR(30) , `paymentStatus` VARCHAR(30) ,`postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

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

  it("Test Updating Invoice from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testCreatePendingInvoices table with report 1
      let insertSQL1 = `INSERT INTO testCreatePendingInvoices (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id}, '${artistEmail}', '${customerEmail}', '${price}}', '${prodDesc}', '${type}', '${status}', '${date}');`;
      insertQueries.push(connection.query(insertSQL1));

      let updateQuery = `UPDATE testCreatePendingInvoices SET paymentStatus = '` + newStatus + `' WHERE id = '` + id + `'`;
      insertQueries.push(connection.query(updateQuery));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testCreatePendingInvoices");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 2)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(id);
      expect(rows[0].artistEmail).toBe(artistEmail);
      expect(rows[0].customerEmail).toBe(customerEmail);
      expect(rows[0].prodCost).toBe(price);
      expect(rows[0].paymentType).toBe(type);
      expect(rows[0].paymentStatus).toBe(newStatus);
      expect(rows[0].postDate).toBe(date);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testCreatePendingInvoices`";
      await connection.query(dropTestInvoicesTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testCreatePendingInvoices`";
    await connection.query(dropTestInvoicesTableSQL);
    await connection.end();
  });
});
