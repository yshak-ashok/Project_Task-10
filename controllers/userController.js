const UserService = require('../services/userService');
const PostService = require('../services/postService');
console.log('usercontroller');

// User registration
const userRegister = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await UserService.registerUser(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        //res.status(500).json({ success: false, message: error.message });
        next({ message: error.message, statusCode: 500 });
    }
};

// User login route
const userLogin = async (req, res, next) => {
    try {
        const credentials = req.body;
        const { user, token } = await UserService.loginUser(credentials);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        //res.status(401).json({ success: false, message: error.message });
        next({ message: error.message, statusCode: 401 });
    }
};

const userHome = async (req, res, next) => {
    try {
        res.json({ message: `Welcome, ${req.user.name}!` });
    } catch (error) {
        //res.status(401).json({ success: false, message: error.message });
        next({ message: error.message, statusCode: 401 });
    }
};

const createPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postData = req.body;
        const post = await PostService.createPost(userId, postData);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        next({ message: error.message, statusCode: 500 });
    }
};

const getUserWithPost = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = await UserService.getUserWithPost(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        next({ message: error.message, statusCode: 401 });
    }
};
const getAllUserData = async (req, res, next) => {
    try {
        const allUserData = await UserService.getAllUserWithPost();
        if (!allUserData) {
            return res.status(404).json({ success: false, message: 'No Data Available' });
        }
        res.status(200).json(allUserData);
    } catch (error) {
        next({ message: error.message, statusCode: 401 });
    }
};

const updatePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        const updatedPostData = req.body;
        const post = await PostService.updatePost(userId, postId, updatedPostData);
        res.status(201).json({ success: true, message: 'Post updated successfully', data: post });
    } catch (error) {
        next({ message: error.message, statusCode: 401 });
    }
};
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await PostService.getPostById(postId);
        console.log('post:', post);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        const postUserId = post.userId.toString();
        console.log(`postuserid:${postUserId}  userid${userId}`);
        // if (postUserId !== userId) {
        //     return res.status(403).json({ success: false, message: 'Unauthorized to delete this post' });
        // }
        // Delete the post
        await PostService.deletePost(postId);
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        next({ message: error.message, statusCode: 401 });
    }
};

module.exports = { userRegister, userLogin, userHome, createPost, getUserWithPost, getAllUserData, updatePost, deletePost };
