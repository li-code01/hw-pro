const axios = require("axios");
const dayjs = require("dayjs");
const goldMongo = require("../../mongo/goldMongo");

// 获取金价
const getGoldPrice = async () => {
  const data = {
    instid: "Au100g",
  };
  const queryString = new URLSearchParams(data).toString();
  const res = await axios
    .post("https://www.sge.com.cn/graph/quotations", queryString, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "Hm_lvt_9165e30c92968eb1baa5e3eb5f34dc60=1711344399; Hm_lpvt_9165e30c92968eb1baa5e3eb5f34dc60=1711345413; JSESSIONID=67437EDC4759A3279174A416D82FF6D0",
      },
    })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("getGoldPrice", res);
  return res;
};
// 记录金价
const recardGoldPrice = async (goldInfo) => {
  console.log("recardGoldPrice", goldInfo);

  await goldMongo.insert("gold_day_list", goldInfo);
};

module.exports = async (req, res) => {
  try {
    const data = await getGoldPrice();
    const goldInfo = {
      min: data.min,
      max: data.max,
      heyue: data.heyue,
      createDate: dayjs().format("YYYY-MM-DD hh:mm:ss"),
    };
    res.json({ code: 200, data: goldInfo });
    recardGoldPrice(goldInfo);
  } catch (error) {
    console.log(error);
    res.json({ code: -200, errmsg: error, data: [] });
  }
};
