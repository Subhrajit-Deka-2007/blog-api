const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:
{
        type: String,
        required:true    
},

    // post content
    content:
    {
        type: String,
        required:true
    },

    // who wrote the post
    username:
    {
        type: String,
     required:true   
    },

    // category of post
    category:
    {
        type: String,
        required:true
    }
},{timestamps:true});

//index on username-> find posts by specif user fast

postSchema.index({ username: 1 });
// index on createdAt -> sort by newest fast
postSchema.index({ createdAt: -1 });
// index on category -> filter by category fast

postSchema.index({ category: 1 });
//text index on title and content -> search words fast

postSchema.index({ title: 'text', content: 'text' });
module.exports = mongoose.model('Post', postSchema);