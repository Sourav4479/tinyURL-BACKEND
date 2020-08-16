const express = require('express')
const router = express.Router()

const config = require('../config/secret')

const UrlController = require('../controllers/url')

module.exports.setRouter = (app) => {
    const baseUrl = `${config.apiUrl}/short`;

    console.log(`${baseUrl}/register`)

    app.post(`/${baseUrl}/create`,UrlController.create)
    app.post(`/${baseUrl}/create-alias`,UrlController.createAlias)
    app.post(`/${baseUrl}/get-original-url`,UrlController.get)
    app.post(`/${baseUrl}/check-availibility`,UrlController.check)
   

}