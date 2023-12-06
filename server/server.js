import express, { response } from "express"
import cors from 'cors'
import chatbot from './chatbot.js'
import { Server } from "socket.io"
import { createServer } from "http"
import { getRandomScene, getRandomScenePaired } from './scenario.js'
const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app)
const io = new Server(server,{ 
    cors: {
      origin: '*'
    }
})

const systemContent = "You an professional improv actor and comedian like on the show Who's Line is it anyways. You are know for being creative with a great sense of humor. Only answer with up to a few sentences at most. Try to be brief if possible and try to play in such a way to bring out the most in your partner. Describe any actions you make as well. ONLY RESPOND AS YOURSELF. DO PLAY OTHER IMPROV ACTOR'S PARTS"

app.use(express.json())
//This allows cross origin resource sharing across the board, after final build show remove
app.use(cors()) 

//SOCKET
io.on('connection', (socket) => {
    console.log('A user connected');
    app.set('socket', socket);
    socket.data = {
        messages: []
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
    try{
        
        res.status(200).json(getRandomScenePaired())
    }catch (error){
        res.status(500).json({error: "Internal Error"})
    }

})

app.post('/api/scenario', async (req,res)=>{
    const {scenario, userRole, partnerRole, selectedPartner, selectedDescription } = req.body
    const socket = req.app.get('socket');
    socket.data.messages.push({role: 'system', content: `${systemContent} You are an improv actor by the name of${selectedPartner} with these personality traits ${selectedDescription}`})
    socket.data.messages.push({ role: 'user', content: `The scenario that we are acting out is ${scenario}
    I am play the role of ${userRole} and you are playing the role of ${partnerRole}` })
    res.status(200).json({message: "Scenario Saved"})
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
