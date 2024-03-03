const AWS = require('aws-sdk')
const express = require('express')
const { StatusCodes } = require('http-status-codes')

const router = express.Router()

router.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK)
})

module.exports = router