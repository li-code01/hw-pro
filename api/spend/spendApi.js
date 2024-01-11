const spendMongo = require("../../mongo/spendMongo");
const { getParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  const postData = req.body;
  const { page, limit, date } = postData;
  try {
    const data = await spendMongo.queryByPage(
      "spent_list",
      { date: { $regex: date } },
      page,
      limit - 0
    );
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
