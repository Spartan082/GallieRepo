const { createPool } = require("mysql2/promise");

describe("Database Info Tests", () => {
  let connection;
  let username = 'Test User';

  //data for report 1
  let requestID = 123456789;
  let email = 'testemail@gmail.com';
  let prodName = 'Test Product';
  let price = '15.55';
  let prodDesc = 'Test Description';
  let date = '2019-05-14T11:01:58.135Z';

  beforeEach(async () => {
    //create mock mysql tables
    let createTestRequestTableSQL =
      "CREATE TABLE `testRemoveRequest` ( `id` INT(9) ZEROFILL , `customerEmail` VARCHAR(30) , `artistUsername` VARCHAR(30) , `prodName` VARCHAR(30) , `initialPrice` DECIMAL(8,2) , `prodDesc` VARCHAR(250) , `postDate` VARCHAR(50) , PRIMARY KEY (`id`)) ENGINE = InnoDB;";

    //connect to db
    connection = await createPool({
      host: 'galliedb.c1j5afoliojj.us-east-1.rds.amazonaws.com',
      user: "admin",
      password: "#Gallie143",
      port: 3306,
      database: "Galliedb"
    });
    console.log("Connected to database");

    await connection.query(createTestRequestTableSQL);
  });

  it("Test Remove Request from DB", async () => {
    try {
      let insertQueries = [];
    
      //populate testRemoveRequest table with report 1
      let insertSQL1 = `INSERT INTO testRemoveRequest (id,  customerEmail, artistUsername, prodName, initialPrice, prodDesc, postDate) VALUES (${requestID}, '${email}', '${username}', '${prodName}', ${price}, '${prodDesc}', '${date}');`;
      insertQueries.push(connection.query(insertSQL1));

      //populate testRemoveRequest table with report 2
      let deleteSQL = `DELETE FROM testRemoveRequest WHERE id = '` + requestID + `'`;
      insertQueries.push(connection.query(deleteSQL));

      await Promise.all(insertQueries);
    
      //query the test tables on the db
      const [rows, fields] = await connection.query("SELECT * FROM testRemoveRequest WHERE artistUsername = '" + username + "' ORDER BY postDate DESC");
    
      //CHECK THAT LENGTH OF RESPONSE MATCHES (should be 2)
      expect(rows.length).toBe(0);

    } catch (error) {
      //log error
      console.log(error);

      //delete test tables and close db connection
      let dropTestRequestTableSQL = "DROP TABLE IF EXISTS `testRemoveRequest`";
      await connection.query(dropTestRequestTableSQL);
      await connection.end();
      return;
    }
  }, 60000);

  //delete test tables and close db connection
  afterEach(async () => {
    let dropTestRequestTableSQL = "DROP TABLE IF EXISTS `testRemoveRequest`";
    await connection.query(dropTestRequestTableSQL);
    await connection.end();
  });
});
