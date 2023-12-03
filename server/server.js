import express from "express"
import cors from 'cors'
import chatbot from './chatbot'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
//This allows cross origin resource sharing across the board, after final build show remove
app.use(cors()) 

app.get('/', (req,res)=>{
    res.send("This is just a simple backend API")
})
app.get('/api/pal',(req,res)=>{
    res.send("hello")
})
app.post('/api/pal', (req,res)=>{

})


//This is the chatbot base function it takes in a object with this template:
// [
//     { role: 'system', content: systemContent },
//     { role: 'user', content: userMessage },
//     { role: 'assistant', content: assistantMessage }
// ],
chatbot.generateText({})

app.listen(port, ()=>{
    console.log("Server Listening on Port:",port)
})