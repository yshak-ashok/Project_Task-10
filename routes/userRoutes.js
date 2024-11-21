const express = require('express')
const userRoute = express()
const userController = require('../controllers/userController')
const userAuthentication = require('../middleware/userAuth')

userRoute.post('/createUser',userController.userRegister)
userRoute.post('/login',userController.userLogin)
userRoute.get('/home',userAuthentication, userController.userHome)
userRoute.post('/createPost', userAuthentication, userController.createPost);
userRoute.get('/userPost/:id', userAuthentication, userController.getUserWithPost);
userRoute.get('/allUserData',userAuthentication,userController.getAllUserData)
userRoute.put('/updatePost/:id', userAuthentication, userController.updatePost);
userRoute.delete('/deletePost/:id',userAuthentication, userController.deletePost)



module.exports=userRoute