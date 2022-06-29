// const path = require('path')
const bcrypt = require('bcryptjs')
const user = require('../model/user')
const jwt = require('jsonwebtoken');


function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
  }

exports.detail = (req,res,next) => {
    bcrypt.hash(req.body.password,12)
    .then(hash_pass => {
        user.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            phone_no:req.body.phone_no,
            password:hash_pass
        })
        res.status(200).json({success:'Done'})
    })
    .catch(err=>{
        res.status(400).json({message:err})
    })
}

exports.allUser = async (req,res,next) =>{
    let email = req.body.email
    let name = req.body.name
    let final = []
    await user.findAll()
    .then(user => {
        final.push(user)
    })
    .catch(err => res.status(400).json({err}))
    await user.findOne({where:{
        email:email,
        name:name
    }})
    .then(search => {
        final.push(search)
        res.status(200).json(final)
    })
    .catch(err => res.status(400).json({err}))
}



