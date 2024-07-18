const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send({response: 'hi bruh'})
})

app.listen(8000, ()=>{
    console.log("Running baby!!!")
})