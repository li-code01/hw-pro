const express = require("express");
const generateToken = require("./utils/creatToken");
const app = express();
const port = 1216;
const cors = require("cors");
const spendApi = require("./api/spend/spendApi");
app.use(
  cors({
    origin: "*", // 允许来自 example.com 的跨域请求
    //  credentials: true // 允许携带凭证 (cookies)
  })
);

app.get("/spendApi", spendApi);

app.get("/welcome", (req, res) => {
  let result = generateToken.generateToken();
  res.send({ code: 0, data: result });
});

app.listen(port);
