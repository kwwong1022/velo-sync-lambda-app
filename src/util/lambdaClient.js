require('dotenv').config()
const { LambdaClient } = require("@aws-sdk/client-lambda");

const lambda = new LambdaClient({
    region: process.env.AWS_SERVICE_REGION,
});

module.exports = lambda