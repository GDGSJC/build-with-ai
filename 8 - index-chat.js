import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/api-overview#chat

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = "Hello, tell me a history about dinossaur";
  const {totalTokens} = await model.countTokens(prompt);
  const result = await model.generateContentStream(prompt);
  let text = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  console.log({totalTokens, text})
}

run();