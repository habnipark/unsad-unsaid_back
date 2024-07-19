require('dotenv').config(); // .env 파일의 환경 변수를 로드
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
app.use(bodyParser.json());

// CORS 설정
const corsOptions = {
  origin: [
    "https://port-0-unsad-unsaid-back-lyt7bu192d19b53c.sel4.cloudtype.app",
    "https://web-unsad-unsaid-front-lyt7bu192d19b53c.sel4.cloudtype.app",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
  ], // 허용할 도메인들
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메서드
  credentials: true, // 쿠키 허용 여부
  optionsSuccessStatus: 204, // 사전 요청에 대한 성공 상태 코드
};

app.use(cors(corsOptions)); // CORS 미들웨어 추가

app.use('/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
