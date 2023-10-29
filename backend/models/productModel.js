import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product name"],
        trim:true
    },
    size:{
        type:String,
        required:[true,"please Enter product size"]

    },
    flavour:{
        type:String,
       

    },
    discount:{
        type:String,
       },
       mrp:{
type:Number,
       },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[8,"price cannot exceed 8 chatacters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please Enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please Enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
        numOfReviews:{
       type:Number,
       default:0
        },
        reviews:[{
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            
            },
name:{
    type:String,
    required:true,
},
rating:{
    type:Number,
    required:true,
},
comment:{
    type:String,
  required:true
}
        }],
      
        createdAt:{
            type:Date,
            default:Date.now
        }
    
})

export const Product=mongoose.model("Product",productSchema)