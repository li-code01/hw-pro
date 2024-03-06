const spendMongo = require("../../mongo/spendMongo");
const dayjs = require("dayjs");
const ObjectId = require("mongodb").ObjectId;

module.exports = async (req, res) => {
  const postData = req.body;
  postData.money = Number(postData.money);
  const calculateSpendInfo = async (postData) => {
    let spend_total = 0;
    let income_total = 0;
    let zfb_spend = 0;
    let zfb_income = 0;
    let wx_spend = 0;
    let wx_income = 0;
    let zfb_deal_total = 0;
    let wx_deal_total = 0;
    if (postData.length > 0) {
      for (let i = 0; i < postData.length; i++) {
        if (postData[i].mode === "支出") {
          spend_total += postData[i].money;
          if (postData[i].pay_type === "zfb") {
            zfb_spend += postData[i].money;
          }
          if (postData[i].pay_type === "wx") {
            wx_spend += postData[i].money;
          }
        } else if (postData[i].mode === "收入") {
          income_total += postData[i].money;
          if (postData[i].pay_type === "zfb") {
            zfb_income += postData[i].money;
          }
          if (postData[i].pay_type === "wx") {
            wx_income += postData[i].money;
          }
        }
        if (postData[i].pay_type === "zfb") {
          zfb_deal_total++;
        } else if (postData[i].pay_type === "wx") {
          wx_deal_total++;
        }
      }
    }
    let obj = {
      spend_total,
      income_total,
      zfb_spend,
      zfb_income,
      wx_spend,
      wx_income,
      zfb_deal_total,
      wx_deal_total,
      deal_total: postData.length,
    };
    return obj;
  };
  const getSpendListByMonth = async (date) => {
    console.log('dayjs(date).format("YYYY/MM")', dayjs(date).format("YYYY/MM"));
    let list = await spendMongo.query("spent_list", {
      date: { $regex: dayjs(date).format("YYYY/MM") },
    });
    return list;
  };
  const updateSpendToal = async (postData) => {
    let list = await getSpendListByMonth(postData.date);
    let calculateSpendData = await calculateSpendInfo(list);
    let year = dayjs(postData.date).format("YYYY");
    let month = dayjs(postData.date).format("MM");
    await spendMongo.update(
      "spend_total",
      { year: Number(year), month: Number(month) },
      { $set: calculateSpendData }
    );
  };
  switch (postData.action) {
    case "add":
      try {
        await spendMongo.insert("spent_list", { ...postData });
        await updateSpendToal(postData);
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    case "edit":
      try {
        // 把id转换成 mongod ObjectId
        let objectId = new ObjectId(postData.id);
        await spendMongo.update(
          "spent_list",
          { _id: objectId },
          { $set: { ...postData } }
        );
        await updateSpendToal(postData);
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    case "delete":
      try {
        // 把id转换成 mongod ObjectId
        let objectId = new ObjectId(postData.id);
        await spendMongo.delete("spent_list", { _id: objectId });
        await updateSpendToal(postData);
        res.json({ code: 200, data: [] });
      } catch (error) {
        console.log(error);
        res.json({ code: -200, errmsg: error, data: [] });
      }
      break;
    default:
      break;
  }
};
