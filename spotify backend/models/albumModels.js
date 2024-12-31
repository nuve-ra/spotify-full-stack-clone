import mongoose from "mongoose";

// Define the schema for an album
const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    des: {
        type: String,
        required: true,
        trim: true
    },
    bgColor: {
        type: String,
        default: "#ffffff",
        trim: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Album", albumSchema);
