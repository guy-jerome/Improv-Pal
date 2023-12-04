import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY});

export default async function generateText(socket, socketEndPoint, messages){
    const stream = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
        stream: true
    });

    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
            socket.emit("message", chunk.choices[0].delta.content);
        }
    }
}



