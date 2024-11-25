const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const morgan=require('morgan')
const app=express();
dotenv.config({path:'../.env'})
const port=process.env.PORT || 4000


app.use(cors())
app.use(morgan('dev'))
app.get('/api/v1/home',async (req,res,next)=>{
    res.status(200).json({
        status:'success',
        data:{
            message:"HELLO"
        }
    })

})

app.listen(port,()=>{
    console.log(`app currently listening on port number ${port}...`)
})