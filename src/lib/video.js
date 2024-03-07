const lambda = require('../util/lambdaClient')
const dynamoDb = require('../util/dynamoDbClient')
const { InvokeCommand } = require("@aws-sdk/client-lambda")
const { PutItemCommand } = require("@aws-sdk/client-dynamodb")

const { 
    LAMBDA_VIDEO_PROCESSOR,
    VIDEO_PROCESS_TABLE,
    VIDEO_PROCESS_STATUS_IN_PROGRESS,
} = require('../constant')

const createVideoProcessJob = async (processId, userId, videoKey, gpxKey, styleKey) => {
    const createdDate = new Date(Date.now()).toISOString()

    const item = {
        id: { S: processId },
        status: { S: VIDEO_PROCESS_STATUS_IN_PROGRESS },
        userId: { S: userId },
        videoKey: { S: videoKey },
        gpxKey: { S: gpxKey },
        styleKey: { S: styleKey },
        createdDate: { S: createdDate },
    }

    const command = new PutItemCommand({
        TableName: VIDEO_PROCESS_TABLE,
        Item: item,
    })
    
    const response = await dynamoDb.send(command)
    return response
}

const invokeVideoProcessor = async (processId) => {
    const params = {
        FunctionName: LAMBDA_VIDEO_PROCESSOR,
        InvocationType: "Event",
    }

    const command = new InvokeCommand(params)

    const response = await lambda.send(command)
    return response
}

module.exports = {
    createVideoProcessJob,
    invokeVideoProcessor
}