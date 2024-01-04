const express = require("express");
const generateToken = require("./utils/creatToken");
const app = express();
const port = 1216;
const cors = require("cors");
const spendGate = require("./api/spend/index");
app.use(
  cors({
    origin: "*", // 允许来自 example.com 的跨域请求
    //  credentials: true // 允许携带凭证 (cookies)
  })
);
// token检验
app.use(function (req, res, next) {
  let token = req.headers["token"];
  if (token) {
    next();
  } else {
    res.send({ code: 1, msg: "token错误" });
  }
});
app.get(/spendApi/, spendGate);

app.get("/welcome", (req, res) => {
  let result = generateToken.generateToken();
  res.send({ code: 0, data: result });
});

app.listen(port);
