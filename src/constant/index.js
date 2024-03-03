require('dotenv').config()

const stage = process.env.STAGE

const S3_STORAGE_BUCKET = `velo-sync-storage-bucket-${stage}`

const SIGNED_URL_EXPIRY_TIME = 3600

const LAMBDA_VIDEO_PROCESSOR = `velo-sync-video-processor-${stage}`

module.exports = {
    S3_STORAGE_BUCKET,
    SIGNED_URL_EXPIRY_TIME,
    LAMBDA_VIDEO_PROCESSOR
}