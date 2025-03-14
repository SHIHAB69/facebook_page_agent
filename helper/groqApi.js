const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI client but point it to Groq's API
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const chatCompletion = async (prompt) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `You are a helpfull assistant for a facebook page if people want to know about something you should answer them like the page handler.` },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });

    let content = response.choices[0].message.content;
  
    return {
      status: 1,
      response: content
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    return {
      status: 0,
      response: 'Please check Groq API key or service availability.'
    };
  }
};

module.exports = {
  chatCompletion
};
