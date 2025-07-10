import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors({
    origin: 'https://medi-sync-dusky.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// api endpoints
app.use('/api/admin',adminRouter)l
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// localhost:3000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
