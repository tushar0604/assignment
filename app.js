const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const user = require('./router/user')
const sequelize = require('./util/database')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

app.use('/main',user)

//Association

sequelize
    // .sync({force:true})
    // .sync({alter:true})
    .sync()
    .then(app.listen(3000))
    .catch(err=>{
        console.log(err)
    })
