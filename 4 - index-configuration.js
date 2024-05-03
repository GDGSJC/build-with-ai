import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/models/generative-models#model-parameters

async function run() {

  /**
   * Config options for content-related requests
   * 
   * @typeof {object} generationConfig
   * @property {string[]} generationConfig.stopSequences - Set a stop sequence to tell the model to stop generating content. A stop sequence can be any sequence of characters. Try to avoid using a sequence of characters that may appear in the generated content.
   * @property {number} generationConfig.maxOutputTokens - Specifies the maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.
   * @property {temperature} generationConfig.temperature - The temperature controls the degree of randomness in token selection. The temperature is used for sampling during response generation, which occurs when topP and topK are applied. Lower temperatures are good for prompts that require a more deterministic or less open-ended response, while higher temperatures can lead to more diverse or creative results. A temperature of 0 is deterministic, meaning that the highest probability response is always selected.
   * @property {topK} generationConfig.topK - The topK parameter changes how the model selects tokens for output. A topK of 1 means the selected token is the most probable among all the tokens in the model's vocabulary (also called greedy decoding), while a topK of 3 means that the next token is selected from among the 3 most probable using the temperature. For each token selection step, the topK tokens with the highest probabilities are sampled. Tokens are then further filtered based on topP with the final token selected using temperature samplin
   * @property {topP} generationConfig.[topP] - The topP parameter changes how the model selects tokens for output. Tokens are selected from the most to least probable until the sum of their probabilities equals the topP value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the topP value is 0.5, then the model will select either A or B as the next token by using the temperature and exclude C as a candidate. The default topP value is 0.95.
   */
  const generationConfig = {
    // stopSequences: ['.'],
    // maxOutputTokens: 50,
    // temperature: 0,
    // topP: 0,
    // topK: 0
  }
  const model = genAI.getGenerativeModel({model: 'gemini-pro', generationConfig});
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