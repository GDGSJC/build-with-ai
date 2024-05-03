import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/models/generative-models#prompt-types

async function runZero() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  //Zero-shot prompts
  const promptZeroShot = "\
  Decida se minha frase é positiva ou negativa,\n\
  Frase: Estou muito feliz com esse workshop hoje";
  const {totalTokens} = await model.countTokens(promptZeroShot);
  const result = await model.generateContentStream(promptZeroShot);
  let text = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  console.log({promptZeroShot, totalTokens, text})
}

async function runOneShot() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  //One-shot prompts
  const promptOneShot = "\
  Decida se minha frase é positiva, negativa ou neutra\n \
  Frase: Esse video é muito legal. Sentimento: positivo\n \
  Frase: Nao sei dizer sobre esse ocorrido: Sentimento:";
  const {totalTokens} = await model.countTokens(promptOneShot);
  const result = await model.generateContentStream(promptOneShot);
  let text = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  console.log({promptOneShot, totalTokens, text})
}

async function runFewShot() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  //Few-shot prompts
  const fewShotPrompt = "\
  Decida se minha frase é positiva, negativa ou neutra \n \
  Frase: Esse video é muito legal. Sentimento: positivo.\n \
  Frase: Nao sei dizer sobre esse ocorrido: Sentimento: neutro \n \
  Frase: Isso é bom, nao sei dizer: Sentimento:";// troque a palavra 'diferente' para 'ruim'
  const {totalTokens} = await model.countTokens(fewShotPrompt);
  const result = await model.generateContentStream(fewShotPrompt);
  let text = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  console.log({fewShotPrompt, totalTokens, text})
}

// sem examplo
//runZero();
// um exemplo
//runOneShot();
//multiplos examplos
//runFewShot();
