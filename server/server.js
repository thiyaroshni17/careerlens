require('dotenv').config()
// Forcing restart for .env load
// Forcing restart for .env load
const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const { connection } = require('./database/db')
const Router = require('./routes/user')
const StudentRouter = require('./routes/student')
const CollegeStudentRouter = require('./routes/collegeStudent')
const IndustryWorkerRouter = require('./routes/industryWorker')
const ResumeRouter = require('./routes/resumeRoutes')
const app = express()
const PORT = process.env.PORT || 4000


app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({ origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'], credentials: true }))
app.use(cookieparser())
app.use('/careerlens/skill', require('./routes/skillRoutes'))
app.use('/careerlens', Router)
app.use('/careerlens/student', StudentRouter)
app.use('/careerlens/collegeStudent', CollegeStudentRouter)
app.use('/careerlens/industryWorker', IndustryWorkerRouter)
app.use('/careerlens/resume', ResumeRouter)
app.use('/careerlens/analysis', require('./routes/analysisRoutes'))
app.use('/careerlens/scraper', require('./routes/scraperRoutes'))

app.use('/uploads', express.static('uploads'))
app.use('/', (req, res) => {
    res.status(404).json({ success: false, message: "Route not found. Ensure you are using the correct endpoint." });
})

connection()

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})