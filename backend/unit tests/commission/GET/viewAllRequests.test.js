const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;

  //data for report
  let requestID = 123456789;
  let email = 'testemail@gmail.com';
  let username = 'Test User';
  let prodName = 'Test Product';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let date = '2019-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestAllRequestTableSQL =
      "CREATE TABLE `testViewAllRequest` ( `id` INT(9) ZEROFILL , `customerEmail` VARCHAR(30) , `artistUsername` VARCHAR(30) , `prodName` VARCHAR(30) , `initialPrice` DECIMAL(8,2) , `prodDesc` VARCHAR(250) , `postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestAllRequestTableSQL);
  });

  it("Test Querying All Requests from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testViewAllRequest table with test data
      let insertSQL = `INSERT INTO testViewAllRequest (id,  customerEmail, artistUsername, prodName, initialPrice, prodDesc, postDate) VALUES (${requestID}, '${email}', '${username}', '${prodName}', ${price}, '${prodDesc}', '${date}');`;
      insertQueries.push(connection.query(insertSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testViewAllRequest");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 1)
      expect(rows.length).toBe(1);

      //CHECK THE VALUES OF DATA RETURNED
      expect(rows[0].id).toBe(requestID);
      expect(rows[0].customerEmail).toBe(email);
      expect(rows[0].artistUsername).toBe(username);
      expect(rows[0].prodName).toBe(prodName);
      expect(rows[0].initialPrice).toBe(price);
      expect(rows[0].prodDesc).toBe(prodDesc);
      expect(rows[0].postDate).toBe(date);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestAllRequestTableSQL = "DROP TABLE IF EXISTS `testViewAllRequest`";
      await connection.query(dropTestAllRequestTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestAllRequestTableSQL = "DROP TABLE IF EXISTS `testViewAllRequest`";
    await connection.query(dropTestAllRequestTableSQL);
    await connection.end();
  });
});
