import express from 'express'
import 'dotenv/config';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'node:url';
import { initDB } from './config/db.js'
import { authRouter } from './routes/authRoutes.js'
import { brandKitRouter } from './routes/brandKitRoutes.js';
import { checkJwt } from './middlewares/checkJwt.js';
import { configurePassport } from './config/passport.js';
import passport from 'passport';


const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(express.json())

await initDB()


app.use(passport.initialize())
configurePassport()



app.use(
   cors({
      origin: true,
      credentials: true
   })
)

app.use("/api/auth", authRouter)
app.use('/api/brandkits', brandKitRouter)

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/api/protected', checkJwt, (req, res) => {
    res.status(200).json({
        message: "You are in protected route",
        userId: req.user.id
    })
})



app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
