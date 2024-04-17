import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = "Hello World!";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(chalk.bgBlue(text))
}

run();