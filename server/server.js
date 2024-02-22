import express, { response } from "express";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import chatbot from './chatbot.js';
import { getRandomScenePaired } from './scenario.js';
import evaluator from "./evaluator.js";
const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*' // Allow cross-origin resource sharing, replace with specific origins in production
  }
});

const systemContent = "You are a professional super funny improv actor and comedian like on the show 'Whose Line Is It Anyway?'. You are known for being creative with a great sense of humor. Only answer with up to a few sentences at most. Try to be brief if possible and try to play in such a way to bring out the most in your partner. Describe any actions you make as well. ONLY RESPOND AS YOURSELF. DO NOT PLAY OTHER IMPROV ACTOR'S PARTS.";

app.use(express.json());
// Enable CORS middleware. Remove in production for more secure configurations.
app.use(cors());

// SOCKET
io.on('connection', (socket) => {
  console.log('A user connected');
  app.set('socket', socket);
  socket.data = {
    messages: []
  };

  // Listen for messages from the client
  socket.on('message', async (data) => {
    socket.data.messages.push({ role: 'user', content: data });
    await chatbot(socket, "message");
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.get('/', (req, res) => {
  // Simple welcome message for the root endpoint
  res.send("Welcome to the Improv Pal API");
});

app.get('/api/scenario', (req, res) => {
  try {
    // Get a random paired scenario
    const scenario = getRandomScenePaired();
    res.status(200).json(scenario);
  } catch (error) {
    // Handle scenario retrieval errors
    console.error("Error retrieving scenario:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/scenario', async (req, res) => {
  try {
    const { scenario, userRole, partnerRole, selectedPartner, selectedDescription } = req.body;
    const socket = req.app.get('socket');

    // Reset messages and send system and user messages
    socket.data.messages = [
      { role: 'system', content: `${systemContent} You are an improv actor by the name of ${selectedPartner} with these personality traits: ${selectedDescription}` },
      { role: 'user', content: `The scenario that we are acting out is ${scenario}. I am playing the role of ${userRole} and you are playing the role of ${partnerRole}` }
    ];

    res.status(200).json({ message: "Scenario Saved" });
  } catch (error) {
    // Handle scenario saving errors
    console.error("Error saving scenario:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/evaluation', async (req, res) =>{
  const {scenario, improvText} = req.body
  try{
    const response = await evaluator(improvText, scenario)
    res.status(200).send(response)
  }catch (error) {
    // Handle scenario saving errors
    console.error("Error saving scenario:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

server.listen(port, () => {
  console.log("Server Listening on Port:", port);
});

// This is the Chatbot template:
// [
//     { role: 'system', content: systemContent },
//     { role: 'user', content: userMessage },
//     { role: 'assistant', content: assistantMessage }
// ],