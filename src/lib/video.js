const lambda = require('../util/lambdaClient')
const { InvokeCommand } = require("@aws-sdk/client-lambda");
const { LAMBDA_VIDEO_PROCESSOR } = require('../constant')

const invokeVideoProcessor = async () => {
    const params = {
        FunctionName: LAMBDA_VIDEO_PROCESSOR,
        InvocationType: "Event",
    }

    const command = new InvokeCommand(params)

    lambda.send(command)
}

module.exports = {
    invokeVideoProcessor
}