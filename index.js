const express = require('express')
const serverless = require('serverless-http')
const { StatusCodes } = require('http-status-codes')
const router = require('./src/router')
const app = express()

app.use('/api/', router)

// Comment if testing on localhost
// module.exports.handler = serverless(app)

// Comment if deploying to AWS
const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`Listening on port ${port}...`))