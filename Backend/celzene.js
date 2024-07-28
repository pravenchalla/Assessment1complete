const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())
const port = 4321;
const mongUrl = "mongodb+srv://praveen:praveen@cluster0.y6h6jpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongUrl,{});
mongoose.connection.on('connected',() => {
    console.log("your MongoDB is connected to Use")
})

const userRoute = require('./Route/userRoute')
const eventRoute = require('./Route/eventRoute')
app.use('/pravn', userRoute)
app.use('/pravn', eventRoute)
app.listen(port, () =>{
    console.log("port connect successfully on" +" " + port)
})