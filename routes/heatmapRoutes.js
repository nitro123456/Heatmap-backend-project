const express=require('express');
const Router = express.Router();

const {authenticateToken}=require('../controllers/authControllers');

const {getHeatmap,createHeatmap,getStreak}=require('../controllers/heatmapControllers');

Router.get('/getHeatmap',authenticateToken,getHeatmap);
 Router.post('/createHeatmap',authenticateToken,createHeatmap);
Router.put('/updateHeatmap',authenticateToken,createHeatmap);
Router.get('/streak',authenticateToken,getStreak)
module.exports=Router;