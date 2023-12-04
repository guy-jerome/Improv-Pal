import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY});

export default async function generateText(socket, socketEndPoint){
    const stream = await openai.chat.completions.create({
        messages: socket.data.messages,
        model: 'gpt-3.5-turbo',
        stream: true
    });

    let text  = ""
    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
            text += chunk.choices[0].delta.content
            socket.emit(socketEndPoint, chunk.choices[0].delta.content);
        }
    }
    socket.data.messages.push({ role: 'assistant', content: text })

}



