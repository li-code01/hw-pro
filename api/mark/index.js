const markList = require("./markList");
const markRecord = require("./markRecord");
const { apiByUrl } = require("../../utils/paramformat");
module.exports = async (req, res) => {
  let apiName = await apiByUrl(req, "/markApi/");
  switch (apiName) {
    case "getMarkList":
      markList(req, res);
      break;
    case "markRecord":
      markRecord(req, res);
      break;
    default:
      res.json({ code: 404, msg: "api not found" });
  }
};
