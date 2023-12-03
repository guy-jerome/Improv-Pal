import express from "express"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/api/pal',(req,res)=>{

})
app.post('/api/pal', (req,res)=>{

})

app.listen(port, ()=>{
    console.log("Server Listening on Port:",port)
})