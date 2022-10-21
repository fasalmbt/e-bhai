import mongoose from "mongoose"
const courseSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        teacher:{
            type:String, 
            required:true,
        },
        img:{
            type:[String],
        },
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        rating:{
            type:String,
            min:0,
            max:5,
        },
        discountPrice:{
            type:Number,
            required:true,
        },
        featured:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
);

export default mongoose.model("course", courseSchema)