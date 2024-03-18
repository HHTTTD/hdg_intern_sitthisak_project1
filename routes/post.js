const express = require('express');
const router = express.Router();
const Post = require('../schema/Post.js');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author').populate('comments');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author').populate('comments');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        author: req.body.author,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        createdAt: new Date(),
        comments: req.body.comments
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.content = req.body.content;
        post.imageUrl = req.body.imageUrl;
        post.tags = req.body.tags;
        post.comments = req.body.comments;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.remove();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
