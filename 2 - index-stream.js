import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = "Me conte a historia dos dinossauros";
  const result = await model.generateContentStream(prompt);
  let text = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chalk.bgGray(chunkText));
    text += chunkText;
  }
}

run();