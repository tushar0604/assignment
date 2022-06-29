const express = require('express')
const route = express.Router()
const user = require('../controller/user')
const jwt = require('jsonwebtoken');
const users = require('../model/user.js')


const authentication = (req,res,next)=>{
    const token = req.header('Authorization');
    if (token){
        const userId = jwt.verify(token,process.env.TOKEN_SECRET);
        users.findOne({where:{phone_no:userId.phone_no}})
        .then(user =>{
            req.user = user
            next()
        })
        .catch(err =>{
            throw new Error(err);
        })
    }
    else{
        res.redirect('/sign-in')
    }
}

route.post('/signUp-detail',authentication ,user.detail)

route.post('/logged-in',authentication,user.allUser)

module.exports = route