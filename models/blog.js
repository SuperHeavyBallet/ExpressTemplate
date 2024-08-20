const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { marked } = require('marked');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    htmlBody: {
        type: String
    }
}, { timestamps: true });

// Pre-save hook to convert Markdown to HTML before saving
blogSchema.pre('save', function (next) {
    if (this.body) {
        this.htmlBody = marked(this.body); // Convert Markdown to HTML
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;