const markMongo = require("../../mongo/markMongo");
const { getParamsByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  try {
    const data = await markMongo.query("mark_list", {});
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
