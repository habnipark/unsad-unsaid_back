require('dotenv').config(); // .env 파일의 환경 변수를 로드
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // CORS 미들웨어 추가

app.use('/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
