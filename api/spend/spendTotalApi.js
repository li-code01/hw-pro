const spendMongo = require("../../mongo/spendMongo");
const { getParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  let { type } = await getParamsByUrl(req);
  console.log("spendTotalApi", type);
  try {
    const data = await spendMongo.query("spend_total", {});
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
