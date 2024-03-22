const express = require("express");
const bodyParser = require("body-parser");
const generateToken = require("./utils/creatToken");
const app = express();
const port = 1216;
const cors = require("cors");
const https = require("https");
const spendGate = require("./api/spend/index");
const scoreGate = require("./api/score/index");
const markGate = require("./api/mark/index");
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
// 解析application/json请求体
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.get(/spendApi/, spendGate);
app.post(/spendApi/, spendGate);
app.post(/markApi/, markGate);
app.get(/scoreApi/, scoreGate);
// app.post(/spendApi/, (req, res) => {
//   const data = req.body;
//   console.log("data", data);
//   res.send({ code: 0, data: [] });
//   // spendGate
// });
app.get("/welcome", (req, res) => {
  let result = generateToken.generateToken();
  res.send({ code: 0, data: result });
});

// app.listen(port);
const opt = {
  key: fs.readFileSync("./certs/a-home.xyz_server.key"),
  cert: fs.readFileSync("./certs/a-home.xyz_server.crt"),
};
const server = https.createServer(opt, app);
server.listen(port, () => {
  console.log("port", port);
});
