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

app.use(express.json())

// middlewares
const allowedOrigins = [
    // Production web apps (commented for reference)
    'https://medi-sync-dusky.vercel.app',
    'https://medisync-admin-mu.vercel.app',
    // // Local development apps
    // 'http://localhost:5173',
    // 'http://localhost:5174'
].concat(
    (process.env.CORS_EXTRA_ORIGINS || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// app.options('*', cors()); // handles preflight OPTIONS requests

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// localhost:3000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
