const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { getSignedUploadUrl } = require('../lib/common')

const router = express.Router()

/**
 * /status:
 *   get:
 *     description: Health check endpoint
 */
router.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK)
})

/**
 * /s3/generate-signed-url:
 *   post:
 *     description: Generate signed s3 url for uploading file
 */
router.post('/s3/generate-signed-url', async (req, res) => {
    const { filename } = req.body

    const signedUrl = await getSignedUploadUrl(filename)

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Signed URL generated successfully.',
        data: { signedUrl },
    })
})

/**
 * /process-video:
 *   post:
 *     description: Triggers video processing
 */
router.post('/process-video', async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Video processing job triggered successfully',
        data: null,
    })
})

module.exports = router