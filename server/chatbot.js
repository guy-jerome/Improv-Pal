import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.CHATGTP_API_KEY})

export default async function generateText(messages){
    const response = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    })
    return response
}