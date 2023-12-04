import express, { response } from "express"
import cors from 'cors'
import chatbot from './chatbot.js'
import {Server} from "socket.io"
import { createServer } from "http"

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app)
const io = new Server(server,{ 
    cors: {
      origin: '*'
    }
})



app.use(express.json())
//This allows cross origin resource sharing across the board, after final build show remove
app.use(cors()) 


io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (data) => {
        console.log('Message from client:', data);
        // Broadcast the message to all clients
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req,res)=>{
    res.send("This is just a simple backend API")
})
app.get('/api/pal',(req,res)=>{
    res.send("hello")
})
app.post('/api/pal', async (req,res)=>{
    const {message} = req.body
    let response = await chatbot([
        { role: 'system', content: "You are a kind assistant" },
        { role: 'user', content: message },
    ]
    )
    res.send(response)
})





//This is the chatbot base function it takes in a object with this template:
// [
//     { role: 'system', content: systemContent },
//     { role: 'user', content: userMessage },
//     { role: 'assistant', content: assistantMessage }
// ],


server.listen(port, ()=>{
    console.log("Server Listening on Port:",port)
})