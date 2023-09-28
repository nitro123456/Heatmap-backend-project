const db=require('../database/connection');

module.exports.getHeatmap=async(req,res)=>{
    const userId=req.user.userID;
    

    
    const heatmap=await db.heatmap.findOne({where:{userId:userId}});
    const response=heatmap.dateActivity;
    res.json({response});
}
module.exports.createHeatmap = async (req, res) => {
  //  const username = req.user.user;
    const dateToUpdate = req.body.date;
    const activityToUpdate = req.body.activity;
    console.log(dateToUpdate, activityToUpdate);
  
    try {

      const heatmap = await db.heatmap.findOne({
        where: { userId: req.user.userID },
      });
  
      if (!heatmap) {
        return res.status(404).json({ message: "Heatmap entry not found for the user." });
      }
  
      const dateIndex = heatmap.dateActivity.findIndex(([date, activity]) => date === dateToUpdate);
   
   console.log(dateIndex);
      if (dateIndex !== -1) {
        heatmap.dateActivity[dateIndex][1] = activityToUpdate;
        await db.heatmap.update(
          { dateActivity: heatmap.dateActivity },
          { where: { userId: req.user.userID } }
        );
        return res.json({ message: "Heatmap created successfully." });
      } else {
        return res.status(404).json({ message: "Date not found in the heatmap." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 module.exports.getStreak=async(req,res)=>{
    const datee=req.body.date;
    const userId=req.user.userID;
    const heatmap=await db.heatmap.findOne({where:{userId:userId}});
    const dateActivity=heatmap.dateActivity;
    let streak=0;
   
    const dateIndex = heatmap.dateActivity.findIndex(([date, activity]) => date === datee);  
    if (dateIndex === -1) {
        return res.status(404).json({ message: "Date not found in the heatmap." });
    }
        
    
    for(let i=dateIndex;i>=0;i--){
        if(dateActivity[i][1]>0){
            streak++;
        }
        else{
            break;
        }
    }
    for(let i=dateIndex+1;i<dateActivity.length;i++){
        if(dateActivity[i][1]>0){
            streak++;
        }
        else{
            break;
        }
    }
    res.json({streak});
 };