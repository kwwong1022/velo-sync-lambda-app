require('dotenv').config()

const STAGE = process.env.STAGE

const S3_STORAGE_BUCKET = `velo-sync-storage-bucket-${STAGE}`

const SIGNED_URL_EXPIRY_TIME = 900

const LAMBDA_VIDEO_PROCESSOR = `velo-sync-video-processor-${STAGE}`

const VIDEO_PROCESS_TABLE = `velo-sync-video-process-table-${STAGE}`

module.exports = {
    S3_STORAGE_BUCKET,
    SIGNED_URL_EXPIRY_TIME,
    LAMBDA_VIDEO_PROCESSOR,
    VIDEO_PROCESS_TABLE
}