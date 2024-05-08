import 'dotenv/config';
import {GoogleGenerativeAI} from '@google/generative-ai';
import chalk from 'chalk';
import fs, {read} from 'fs';


const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

//https://ai.google.dev/gemini-api/docs/api-overview#text_image_input

async function run() {
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  const prompt = "Create a DocString from my python for each function on code below using for example \
   a descriptions about that the functions does, \
   Parameters: to reference a parameters check the function and show up parameters available on function on parameters description , \
   Returns: to say about that is the function returned and the type of return, \
   Raises: if there is any exceptions handler there \n \
   use this template below as example for generate the DocString from mycode: \
   def get(self, context): \
   \"\"\"Gets all knowledge documents of a context. \
\
   Args: \
       context (str): Context name \
   \"\"\" \
   return self.__table_storage.get(context) \n \
   mycode: \n";


  ///Adicionar um arquivo example-file com um texto
  const readFileAsync = new Promise((resolve, reject) =>
    fs.readFile('file/example-file', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      reject(err);
      return;
    }

    const myCode = data;
    const result = await model.generateContent(prompt + myCode);
    resolve(result.response.text());
  }));

  readFileAsync.then(result => {
    console.log(chalk.bgBlue(result))
    fs.writeFile('result.txt', result, erro => {});
  })

}

run();