const express = require('express')
const serverless = require('serverless-http')
const router = require('./src/router')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

// For deploying to AWS Lambda
module.exports.handler = serverless(app)

// For testing on localhost
// const port = process.env.PORT || '3000'
// app.listen(port, () => console.log(`Listening on port ${port}...`))