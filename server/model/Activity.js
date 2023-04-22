const mongoose=require('mongoose')

const activityModel=mongoose.Schema({
    activity:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('activity',activityModel)