require('dotenv').config()

const env = process.env.ENV

const S3_VIDEO_BUCKET = `velo-sync-video-bucket-${env}`

module.exports = {
    S3_VIDEO_BUCKET
}