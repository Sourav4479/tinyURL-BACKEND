const Joi = require('joi')
const httpStatus = require('http-status-codes')
const sha = require('sha256')

const Urls = require('../models/Url')

const {
    Base64
} = require('js-base64');

const CryptoJS = require('crypto-js/enc-base64');

let create = async (req, res) => {
    const schema = Joi.object().keys({
        longUrl: Joi.string().required()
    });
    const {
        error,
        value
    } = Joi.validate(req.body, schema);
    if (error && error.details) {
        return res.status(httpStatus.BAD_REQUEST).json({
            msg: error.details
        })
    }
    //let time = new Date().getTime()
    let  originalUrl = await Urls.findOne({originalUrl:req.body.longUrl})
    if(originalUrl){
        res.status(200).json({status:'OK',response:originalUrl})
    }else{
        
    let sha256Time = sha(new Date().getTime().toString()).substr(64 - 10)
    let sha256Url = sha(req.body.longUrl).substr(64 - 10)
    let hash = Base64.encode((sha256Url + sha256Time)).substring(10, 18)
    
    let newShortUrl = new Urls({
        hash:hash,
        originalUrl:req.body.longUrl
    })
    newShortUrl.save().then((response) => {
        /* console.log(response) */
        res.status(200).json({status:'OK',response})
    }).catch((err) =>{
        console.log(err)
        res.status(500).json({status:'ERROR'})
    })
    }

}
let createAlias = (req, res) => {
    
}
let get = (req, res) => {

}
let check = (req, res) => {

}

module.exports = {
    create,
    createAlias,
    get,
    check
}