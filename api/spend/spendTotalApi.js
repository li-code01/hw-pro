const spendMongo = require("../../mongo/spendMongo");
const { getParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  let { type, year } = await getParamsByUrl(req);
  try {
    const data = await spendMongo.query("spend_total", { year: Number(year) });
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
