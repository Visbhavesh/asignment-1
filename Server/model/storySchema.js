import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,  // Minimum length for title
        maxLength: 200  // Maximum length for title
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,  // Minimum length for content
        maxLength: 2000 // Maximum length for content
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,  // Minimum length for author's name
        maxLength: 100  // Maximum length for author's name
    },
    created_at: {
        type: Date,
        default: Date.now // Default to current date
    }
});

const Story = mongoose.model('Story', storySchema);

export default Story;
