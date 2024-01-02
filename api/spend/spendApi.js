const urlib = require("url");
const spendMongo = require("../../mongo/spendMongo");
const { getParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  let { type, page, limit } = await getParamsByUrl(req);
  console.log("123", type);
  try {
    const data = await spendMongo.queryByPage(
      "spend_list",
      {},
      page,
      limit - 0
    );
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
