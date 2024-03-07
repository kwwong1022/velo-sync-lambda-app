const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { StatusCodes } = require('http-status-codes')
const { 
    createVideoProcessJob, 
    invokeVideoProcessor 
} = require('../lib/video')

const router = express.Router()

/**
 * /video/process:
 *   post:
 *     description: Triggers video processing lambda
 */
router.post('/process', async (req, res) => {
    let success = false, message = 'Video processing job triggered successfully.', data = null

    const { userId, videoKey, gpxKey, styleKey } = req.body

    if (!userId || !videoKey || !gpxKey || !styleKey) {
        message = 'Operation failed. Required field is missing.'
        res.status(StatusCodes.BAD_REQUEST).json({success, message, data})
        return
    }

    const processId = uuidv4()

    try {
        const response = await createVideoProcessJob(processId, userId, videoKey, gpxKey, styleKey)

        if (response.$metadata.httpStatusCode !== 200) {
            message = `System call [createVideoProcessJob] failed. ${err}`
            console.log(message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success, message, data})
            return
        }

    } catch (err) {
        message = `System call [createVideoProcessJob] failed. ${err}`
        console.log(message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success, message, data})
        return
    }

    try {
        const response = await invokeVideoProcessor(processId)

        if (response.$metadata.httpStatusCode !== 202) {
            message = `System call [invokeVideoProcessor] failed. ${err}`
            console.log(message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success, message, data})
            return
        }

        success = true
        data = { processId }
        res.status(StatusCodes.OK).json({success, message, data})

    } catch (err) {
        message = `System call [invokeVideoProcessor] failed. ${err}`
        console.log(message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success, message, data})
        return
    }
})

module.exports = router