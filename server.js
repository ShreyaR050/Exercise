const express=require('express')
const cors =require('cors')
// const mongoose =require('mongoose')
const { connected } = require('process')
const mongoose  = require('mongoose')

require('dotenv').config()

const app=express()
const port=process.env.PORT ||8080;

app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
// console.log(uri)
mongoose.set('strictQuery',false);

mongoose.connect(
    uri, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{console.log("Database connected")});
// mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
// const connection=mongoose.connection;
// connection.once('open',()=>{
//     console.log("heloo")
// })

const exerciseRouter=require('./routes/exercise_route');
const userRouter=require('./routes/user_route');
app.use('/exercises',exerciseRouter);
app.use('/user',userRouter);


app.listen(port,()=>{

    console.log(`server is running on port : ${port}`);

}); 