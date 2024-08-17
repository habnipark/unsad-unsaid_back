const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot.js');

// .env 파일의 환경 변수를 로드합니다.
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const frontUrl = process.env.FRONT_URL;

console.log('app', apiKey);

const app = express();
app.use(bodyParser.json());

// CORS 설정을 추가하여 특정 주소에서의 요청만 허용합니다.
const corsOptions = {
    origin: `${frontUrl}`,
    optionsSuccessStatus: 200 // 일부 브라우저에서 CORS 프리플라이트 요청의 성공 상태를 204 대신 200으로 반환하도록 설정
};

app.use(cors(corsOptions));

module.exports = { app, apiKey };

app.use('/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
