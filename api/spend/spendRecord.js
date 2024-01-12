const spendMongo = require("../../mongo/spendMongo");
const bodyParser = require("body-parser");
const { postParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  const postData = req.body;
  postData.money = Number(postData.money);
  try {
    const data = await spendMongo.insert("spent_list", { ...postData });
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
