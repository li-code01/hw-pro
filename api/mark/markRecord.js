const markMongo = require("../../mongo/markMongo");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
module.exports = async (req, res) => {
  const postData = req.body;
  switch (postData.action) {
    case "add":
      try {
        await markMongo.insert("mark_list", { ...postData });
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    case "edit":
      try {
        // 把id转换成 mongod ObjectId
        let objectId = new ObjectId(postData.id);
        await markMongo.update(
          "mark_list",
          { _id: objectId },
          { $set: { ...postData } }
        );
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    case "delete":
      try {
        // 把id转换成 mongod ObjectId
        let objectId = new ObjectId(postData.id);
        await markMongo.delete("mark_list", { _id: objectId });
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    default:
      break;
  }
};
