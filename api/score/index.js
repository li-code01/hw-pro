const scoreMongo = require("../../mongo/scoreMongo");
module.exports = async (req, res) => {
  try {
    const data = await scoreMongo.query("score", {});
    res.json({ code: 200, data: data });
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
