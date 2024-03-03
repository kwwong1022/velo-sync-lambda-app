require('dotenv').config()
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { Upload } = require('@aws-sdk/client-s3')
const s3 = require('../util/s3Client')

const router = express.Router()

router.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK)
})

router.post('/s3/upload', async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: "success"
    })
})

module.exports = router