import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = "Hello World";
  const {totalTokens} = await model.countTokens(prompt);
  //  One token is approximately four characters. 
  // 100 tokens correspond to roughly 60-80 words.
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(chalk.bgBlue(text), totalTokens)
}

run();