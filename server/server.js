import express from "express"
import cors from 'cors'

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

app.listen(port, ()=>{
    console.log("Server Listening on Port:",port)
})