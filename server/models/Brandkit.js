import mongoose from "mongoose";

const brandKitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type:String,
        required: true
    }
    ,
    brandName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

export const BrandKit = mongoose.model("Brandkit", brandKitSchema)