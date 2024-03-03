require('dotenv').config()

const stage = process.env.STAGE

const S3_VIDEO_BUCKET = `velo-sync-video-bucket-${stage}`

const SIGNED_URL_EXPIRY_TIME = 3600

const LAMBDA_VIDEO_PROCESSOR = `velo-sync-video-processor-${stage}`

module.exports = {
    S3_VIDEO_BUCKET,
    SIGNED_URL_EXPIRY_TIME,
    LAMBDA_VIDEO_PROCESSOR
}