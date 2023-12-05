import express, { response } from "express"
import cors from 'cors'
import chatbot from './chatbot.js'
import { Server } from "socket.io"
import { createServer } from "http"
import { getRandomScene } from './scenario.js'
const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app)
const io = new Server(server,{ 
    cors: {
      origin: '*'
    }
})

const systemContent = "You an professional improv actor and comedian like on the show Who's Line is it anyways. You are know for being creative with a great sense of humor"

app.use(express.json())
//This allows cross origin resource sharing across the board, after final build show remove
app.use(cors()) 

//SOCKET
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.data = {
        messages: [
            { role: 'system', content: systemContent },
        ]
    }
    
    // Listen for messages from the client
    socket.on('message', async (data) => {
        socket.data.messages.push({ role: 'user', content: data })
        await chatbot(socket,"message")

    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req,res)=>{
    res.send("This is just a simple backend API")
})

app.get('/api/scenario', (req,res)=>{
    res.status(200).json({scenario: getRandomScene()})
})

app.post('/api/scenario', (req,res)=>{
    console.log(req.body)
})

server.listen(port, ()=>{
    console.log("Server Listening on Port:",port)
})

//This is the Chatbot template:
// [
//     { role: 'system', content: systemContent },
//     { role: 'user', content: userMessage },
//     { role: 'assistant', content: assistantMessage }
// ],
