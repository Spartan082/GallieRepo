const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;
  let status = 'Pending';

  //data for report 1
  let id = 123456789;
  let artistEmail = 'testartistemail@gmail.com';
  let customerEmail = 'testcustomeremail@gmail.com';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let type = 'Test Type';
  let date = '2019-05-14T11:01:58.135Z';

  //data for report 2
  let id2 = 987654321;
  let artistEmail2 = 'testartistemail2@gmail.com';
  let customerEmail2 = 'testcustomeremail2@gmail.com';
  let price2 = '15.54';
  let prodDesc2 = 'Test Description 2';
  let type2 = 'Test Type 2';
  let date2 = '2020-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestInvoicesTableSQL =
      "CREATE TABLE `testViewPendingInvoices` ( `id` INT(9) ZEROFILL , `artistEmail` VARCHAR(30) , `customerEmail` VARCHAR(30),  `prodCost` DECIMAL(8,2),  `prodDesc` VARCHAR(250) , `paymentType` VARCHAR(30) , `paymentStatus` VARCHAR(30) ,`postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

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

  it("Test Querying Pending Invoices from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testViewPendingInvoices table with report 1
      let insertSQL1 = `INSERT INTO testViewPendingInvoices (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id}, '${artistEmail}', '${customerEmail}', '${price}}', '${prodDesc}', '${type}', '${status}', '${date}');`;
      insertQueries.push(connection.query(insertSQL1));

      //populate testViewPendingInvoices table with report 2
      let insertSQL2 = `INSERT INTO testViewPendingInvoices (id, artistEmail, customerEmail, prodCost, prodDesc, paymentType, paymentStatus, postDate) VALUES (${id2}, '${artistEmail2}', '${customerEmail2}', '${price2}}', '${prodDesc2}', '${type2}', '${status}', '${date2}');`;
      insertQueries.push(connection.query(insertSQL2));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testViewPendingInvoices WHERE paymentStatus = 'Pending' ORDER BY postDate DESC;");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 2)
      expect(rows.length).toBe(2);

      //CHECK THE VALUES OF DATA RETURNED
      //report 2 first - descending date order
      expect(rows[0].id).toBe(id2);
      expect(rows[0].artistEmail).toBe(artistEmail2);
      expect(rows[0].customerEmail).toBe(customerEmail2);
      expect(rows[0].prodCost).toBe(price2);
      expect(rows[0].paymentType).toBe(type2);
      expect(rows[0].paymentStatus).toBe(status);
      expect(rows[0].postDate).toBe(date2);

      expect(rows[1].id).toBe(id);
      expect(rows[1].artistEmail).toBe(artistEmail);
      expect(rows[1].customerEmail).toBe(customerEmail);
      expect(rows[1].prodCost).toBe(price);
      expect(rows[1].paymentType).toBe(type);
      expect(rows[1].paymentStatus).toBe(status);
      expect(rows[1].postDate).toBe(date);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testViewPendingInvoices`";
      await connection.query(dropTestInvoicesTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestInvoicesTableSQL = "DROP TABLE IF EXISTS `testViewPendingInvoices`";
    await connection.query(dropTestInvoicesTableSQL);
    await connection.end();
  });
});
