const mongoose=require("mongoose");

const connection=mongoose.connect(process.env.Mongourl);

module.exports={connection}
