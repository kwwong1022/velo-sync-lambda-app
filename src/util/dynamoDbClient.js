require('dotenv').config()
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")

const dynamoDb = new DynamoDBClient({
    region: process.env.AWS_SERVICE_REGION,
})

module.exports = dynamoDb