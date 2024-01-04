const getSpendList = require("./spendApi");
const spendTotal = require("./spendTotalApi");
const { apiByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  let apiName = await apiByUrl(req, "/spendApi/");
  console.log("spendApi", apiName);
  switch (apiName) {
    case "getSpendList":
      getSpendList(req, res);
      break;
    case "getSpendTotal":
      spendTotal(req, res);
      break;
    default:
      res.json({ code: 404, msg: "api not found" });
  }
};
