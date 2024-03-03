const s3 = require('../util/s3Client')
const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const { 
    S3_VIDEO_BUCKET, 
    SIGNED_URL_EXPIRY_TIME 
} = require('../constant')

const getSignedUploadUrl = async (fileName) => {
    const command = new PutObjectCommand({
        Bucket: S3_VIDEO_BUCKET,
        Key: fileName,
    })

    const url = await getSignedUrl(s3, command, { expiresIn: SIGNED_URL_EXPIRY_TIME })

    return url
}

module.exports = {
    getSignedUploadUrl
}