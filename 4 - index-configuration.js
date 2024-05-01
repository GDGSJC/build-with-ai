import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/models/generative-models#model-parameters

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  //Zero-shot prompts
  const prompt = "Hello, tell me a history about dinossaur";
  //One-shot prompts

  //Few-shot prompts
  const {totalTokens} = await model.countTokens(prompt);
  //  A token is approximately four characters. 
  // 100 tokens correspond to roughly 60-80 words.
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