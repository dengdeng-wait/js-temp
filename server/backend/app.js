var express = require('express'); //express 설치 node server
var cors = require('cors'); // cors라이브러리 설치해서 사용(프론트와 백엔드 서버분리 작업할때 사용)
var app = express();
app.use(cors()); //cors실행 

// respond with "hello world" when a GET request is made to the homepage
// app.get('/test', function(req, res) {
//   res.send('hello world');
// });

app.listen(8080, function() {  
  console.log('listening on 8080');
});

app.get('/pet', function(req, res){
  //json형태 저장
  res.json({
    url: 'https://www.naver.com'
  });
});