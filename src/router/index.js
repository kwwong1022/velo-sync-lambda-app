require('dotenv').config()
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const s3 = require('../util/s3Client')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/**
 * /status:
 *   get:
 *     description: Health check endpoint
 */
router.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK)
})

/**
 * /status:
 *   get:
 *     description: Connected with AWS S3, file can be uploaded to specific bucket
 */
router.post('/s3/upload', upload.single('file'), async (req, res) => {
    req.file.buffer

    const params = {
        Bucket: `velo-sync-video-bucket-${process.env.ENV}`,
        Key: `${new Date(Date.now()).toString()}.png`,
        Body: req.file.buffer,
        ContentType: req.filter.mimetype,
    }
    
    const command = new PutObjectCommand(params)

    await s3.send(command)

    res.status(StatusCodes.OK).json({
        success: true,
        data: "success"
    })
})

module.exports = router