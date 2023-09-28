const express=require('express');

const bodyParser=require('body-parser');
const userRouter=require('./routes/userRoutes');
const heatmapRouter=require('./routes/heatmapRoutes');
const { SERVER_PORT } = require('./constants');
console.log(SERVER_PORT);
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require("./database/connection");

app.get('/',(req,res)=>{
    res.send('hello world')

})
app.use('/api',userRouter);
app.use('/api',heatmapRouter);

app.listen(SERVER_PORT,()=>{
    console.log(`Server is running at port ${SERVER_PORT}`);
}
)