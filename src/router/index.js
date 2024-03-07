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
    let success = false, message = 'Signed URL generated successfully.', data = null

    const { filename } = req.body

    if (!filename) {
        message = 'Operation failed. File name is missing.'
        res.status(StatusCodes.BAD_REQUEST).json({success, message, data})
        return
    }

    try {
        const signedUrl = await getSignedUploadUrl(filename)

        success = true
        data = { signedUrl }
        res.status(StatusCodes.OK).json({success, message, data})

    } catch (err) {
        message = `System call [getSignedUploadUrl] failed. ${err}`
        console.log(message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success, message, data})
    }
})

module.exports = router