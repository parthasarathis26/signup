const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/Project1",{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("Connection error", err);
});

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


collection=new mongoose.model("Collection1",LogInSchema);
module.exports=collection
