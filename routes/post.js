const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/*
POST /api/posts
Create a new post
*/

router.post('/', async (req, res) => {
    try
    {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

/*
GET /api/posts
Get all posts with pagination
*/

router.get('/', async (req, res) => {
    try {
        /*
        Get page and limit from query params
        example : /api/posts?page=1&limit=10
        */
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10
    
        //calculate how many documents to skip
        const skip = (page - 1) * limit;
        /*
        s=fetch posts sorted by newest first
        using createdAt index
        */
        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).
            limit(limit)
            .lean();
        // get total count for pagination info 
        const total = await Post.countDocuments();
        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});
 

/*
GET /api/posts/category/:category
Get posts by categoryuses category index
*/

router.get('/category/:category', async (req, res) => {
    try {
        const posts = await Post.find({ category: req.params.category }).sort({ createdAt: -1 }).lean();
        return res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
   }
});

/*
GET /api/posts/search?q=docker
//Search posts by title or content uses text index
*/

router.get('/search', async (req, res) => {
    try
    {
        // get search query from query params
        const query = req.query.q;
        // if no query provided return errror
        if (!query) return res.status(400).json({
            message: 'Search query is required'
        });

        //search using text index
        const posts = await Post.find(
            {
                $text: { $search: query }
            }
        ).lean();
        return res.json(posts);

    } catch (err) {
        res.status(500).json({ message: err.message });
     }
});

/*
GET /api/posts/:id
Get single post by id
*/

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (!post) return res.status(404).json({ message: 'Post not found ' });
        return res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;