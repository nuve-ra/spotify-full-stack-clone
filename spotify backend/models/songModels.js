import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String, // Must be a string
        required: true // Field is mandatory
    },
    artist: {
        type: String, // Must be a string
        default: "Unknown Artist" // Default value if not provided
    },
    album: {
        type: String, // Must be a string
        default: "Single" // Default value if not provided
    },
    image: {
        type: String, // Must be a string (URL for the image)
        required: true // Field is mandatory
    },
    des: {
        type: String, // Must be a string (description)
        required: true // Field is mandatory
    },
    file: {
        type: String, // Must be a string (URL for the audio file)
        required: true // Field is mandatory
    },
    duration: {
        type: String, // Must be a string (e.g., "3:45")
        required: true // Field is mandatory
    },
}, {
    timestamps: true
});

// Export the model
const songModel = mongoose.models.song || mongoose.model("song", songSchema);
export default songModel;
