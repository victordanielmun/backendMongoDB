import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryPath: {
        type: String,
        required: true  
    },
    category: {
        type: Number,
        required: true
    },
})

export default mongoose.model("Category", categorySchema);