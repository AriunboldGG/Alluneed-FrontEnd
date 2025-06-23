const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data); // <-- Add this line

    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: null, error: data.error || "No response from OpenAI" });
    }
  } catch (err) {
    console.error('OpenAI fetch error:', err);
    res.json({ reply: null, error: err.message });
  }
});

module.exports = router;