import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

//Create a new OpenAI object, you have to set the apiKey here.
//If you do not have an API key then you can request one from the OpenAI website
const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY});

export default async function generateText(socket, socketEndPoint){
    const stream = await openai.chat.completions.create({
        messages: socket.data.messages,
        model: 'gpt-3.5-turbo',
        stream: true //This makes it so that the chat messages are streamed in real time
    });

    //This uses sockets to stream the message chunks to the front end
    let text  = ""
    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
            text += chunk.choices[0].delta.content
            socket.emit(socketEndPoint, chunk.choices[0].delta.content);
        }
    }
    socket.data.messages.push({ role: 'assistant', content: text })

}



