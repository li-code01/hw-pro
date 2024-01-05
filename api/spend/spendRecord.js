const spendMongo = require("../../mongo/spendMongo");
const bodyParser = require("body-parser");
const { postParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  const postData = req.body;
  console.log("postData", postData);
  //   let { type, action } = await postParamsByUrl(req);
  //   console.log("spendRecord", req, type, action);
  //   res.json({ code: 200, data: data });
  try {
    const data = await spendMongo.insert("spend_list", { postData });
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
