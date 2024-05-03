
const Post = require('../models/postsModel');

exports.createPost = async (req, res) => {
    try {
        const { user } = req;
        const { title, body, location } = req.body;
        const createdBy = user._id;
        const post = new Post({ title, body, location, createdBy });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getPosts = async (req, res) => {
    try {
        const { user } = req;
        const createdBy = user._id;
        const posts = await Post.find({ createdBy });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updatePost = async (req, res) => {
    try {
        const { user, query } = req;
        const { postId } = query;
        const { title, body, location } = req.body;
        const createdBy = user._id;
        const post = await Post.findOneAndUpdate({ _id: postId, createdBy }, { title, body, location }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPostCount = async (req, res) => {
    try {
        const activeCount = await Post.countDocuments({ isActive: true });
        const inactiveCount = await Post.countDocuments({ isActive: false });
        res.json({ active: activeCount, inactive: inactiveCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const createdBy = req.user._id;
        const post = await Post.findOneAndDelete({ _id: postId, createdBy });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getPostsByLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const maxDistance = 10000;
        const posts = await Post.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: maxDistance
                }
            }
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};