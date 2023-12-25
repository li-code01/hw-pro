var spendMongo = require("../../mongo/spendMongo");
const urlib = require("url");
const MongoClient = require("mongodb").MongoClient;
module.exports = (req, res) => {
  console.log("123");
  // let urls = req.url;
  //   let myobj = urlib.parse(urls, true);
  //   let { date } = myobj.query;
  // Connection URL
  const url = "mongodb://124.71.138.134:21777/";

  // Database Name
  const dbName = "spend";

  // Use connect method to connect to the database
  MongoClient.connect(
    url,
    {
      auth: {
        username: "liAdmin",
        password: "LOVExi0420.",
      },
      authSource: "admin",
      authMechanism: "DEFAULT",
    },
    function (err, client) {
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      // perform actions on the collection object
      const collection = db.collection("spend_list");

      // Example query
      collection.find({}).toArray(function (err, result) {
        console.log(result);
        // Insert a document
        collection.insertOne({ name: "John", age: 30 }, function (err, res) {
          console.log("Inserted a document into the collection");
        });

        // Close the connection
        client.close();
      });
    }
  );
  // spendMongo.query("spend_list", {}, (err, result) => {
  //   if (err) {
  //     res.json({ code: 300, data: err });
  //   } else {
  //     res.json({ code: 200, data: result });
  //   }
  // });
};
