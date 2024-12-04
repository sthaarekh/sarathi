const express=require('express')
const generalRoutes=require('./Routes/generalRoutes')
const clubRoutes=require('./Routes/clubRoutes')
const verifyEmail=require('./Routes/EmailVerificationRoute')
const adminRoutes=require('./Routes/adminRoutes')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const app=express();

dotenv.config({path:'./.env'})
const port=process.env.PORT || 4000
const url=process.env.DB_URL;

mongoose.connect(url).then(console.log("database connected successfully"))
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1',generalRoutes);
app.use('/api/v1',clubRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/',verifyEmail)

app.listen(port,()=>{
    console.log(`app currently listening on port number ${port}... `)
})