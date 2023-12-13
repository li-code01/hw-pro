const express = require('express');     
const app = express();
const port = 1216;  
const cors = require('cors');
app.use(cors({
  origin: '*', // 允许来自 example.com 的跨域请求  
	//  credentials: true // 允许携带凭证 (cookies)  
  }));

app.get('/welcome', (req, res) => {  
	  res.send('Hello World!');
});  
  
app.listen(port, () => {  
	  console.log(`App listening at http://localhost:${port}`);  
});
