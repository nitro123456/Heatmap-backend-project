const express=require('express');
const Router = express.Router();

const {generateToken,verifyToken}=require('../controllers/authControllers');

const {register,login,getUser,updateUser,deleteUser}=require('../controllers/userControllers');

Router.post('/create',register);
 Router.post('/login',login);
module.exports=Router;