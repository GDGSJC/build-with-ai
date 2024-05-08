import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';
import fs from 'fs';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/api-overview#text_image_input

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro-vision'});
  const prompt = "Qual a diferença dessas duas imagens considerando o escrito no papel?";

  const image1 = {
    inlineData: {
      data: Buffer.from(fs.readFileSync("img/headphone e jbl.jpeg")).toString("base64"),
      mimeType: "image/png",
    },
  };
  const image2 = {
    inlineData: {
      data: Buffer.from(fs.readFileSync("img/headphone e bose.jpeg")).toString("base64"),
      mimeType: "image/png",
    },
  };
  const result = await model.generateContent([prompt, image1, image2]);
  const text = result.response.text();

  console.log(chalk.bgBlackBright(text))
}

run();