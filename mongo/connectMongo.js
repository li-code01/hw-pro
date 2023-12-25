const client = require("mongodb").MongoClient;
var mongodbUrl = require("../config/config");
module.exports = {
  conn: function (dbName, cb) {
    console.log(mongodbUrl, client);
    try {
      client.connect(
        mongodbUrl,
        {
          auth: {
            username: "liAdmin",
            password: "LOVExi0420.",
          },
          authSource: "admin",
          authMechanism: "DEFAULT",
        },
        function (err, client) {
          console.log("数据库");
          if (err) {
            console.log("数据库连接失败");
          } else {
            console.log("数据库连接成功");
            //指定数据库的名字"dbName"
            var db = client.db(dbName);
            cb(db);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
