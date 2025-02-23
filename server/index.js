import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({message:"Everything is fine"})
})

// routes
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@recipe-generator.6fdup.mongodb.net/`)
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}
start()