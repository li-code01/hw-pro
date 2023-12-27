const { MongoClient } = require("mongodb");
var { mongodbUrl, username, password } = require("../config/config");
const client = new MongoClient(mongodbUrl, {
  auth: {
    username,
    password,
  },
  authSource: "admin",
  authMechanism: "DEFAULT",
});
module.exports = {
  // 连接mongodb
  conn: async function (dbName) {
    const db = await client.db(dbName);
    return db;
  },
};
