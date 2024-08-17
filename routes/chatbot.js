const express = require('express');
const OpenAI = require('openai');
const { systemPrompt } = require('../prompt.js');
const { apiKey } = require('../app.js');

const router = express.Router();
const openai = new OpenAI({
    apiKey: apiKey
});

router.post('/message', async (req, res) => {
    const userInput = req.body.message;
    // console.log('Received user input:', userInput); // 입력 로그

    const promptWithUserInput = `${systemPrompt}\n입력: "${userInput}"\n응답:`;

    try {
        // OpenAI API를 사용하여 ChatGPT 응답 생성
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: promptWithUserInput },
                { role: "user", content: userInput }
            ],
        });

        // OpenAI API로부터 받은 응답
        // console.log(completion.choices[0]);
        let botResponse = completion.choices[0].message.content.trim();

        // 응답에서 따옴표 제거
        if (botResponse.startsWith('"') && botResponse.endsWith('"')) {
            botResponse = botResponse.slice(1, -1);
        }

        // console.log('OpenAI API response:', botResponse); // 응답 로그
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});

module.exports = router;
