const express = require('express')
const { register, login, logout, sendverifyotp, verifyaccount, Resetpasswordotp, resetpassword, isauth, userdata } = require('../controller/user.js')
const userauth = require('../middleware/userauth.js')
const Router = express.Router()

Router.post('/reg',register)
Router.post('/login',login)
Router.post('/logout',logout)
Router.post('/sendotp',userauth,sendverifyotp)
Router.post('/verifyaccount',userauth,verifyaccount)
Router.get('/isauth',userauth,isauth)
Router.get('/data',userauth,userdata)
Router.post('/resetotp',Resetpasswordotp)
Router.post('/resetpassword',resetpassword)




module.exports = Router