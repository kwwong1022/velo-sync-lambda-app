const express = require('express')
const serverless = require('serverless-http')
const router = require('./src/router')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

// Comment if testing on localhost
module.exports.handler = serverless(app)

// Comment if deploying to AWS
// const port = process.env.PORT || '3000'
// app.listen(port, () => console.log(`Listening on port ${port}...`))