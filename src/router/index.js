const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { getSignedUploadUrl } = require('../lib/common')

const router = express.Router()
router.use('/video', require('./video'))

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

module.exports = router