const express = require('express')
const { StatusCodes } = require('http-status-codes')

const router = express.Router()

/**
 * /video/process:
 *   post:
 *     description: Triggers video processing
 */
router.post('/process', async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Video processing job triggered successfully',
        data: null,
    })
})

module.exports = router