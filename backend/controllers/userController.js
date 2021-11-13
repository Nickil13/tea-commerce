const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
})

// @desc     Get all users
// @route    GET /api/users/
// @access   Private/Admin
const getUsers = asyncHandler(async(req,res) =>{
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    let query = {};

    //Query by keyword
    if(req.query.keyword){
        query = {...query, 
            username: {
                $regex: req.query.keyword,
                $options: 'i'}
                     
        }
    }
    const count = await User.countDocuments({...query});
    const users = await User.find({...query}).limit(pageSize).skip(pageSize * (page-1));
    
    res.json({users, page, pages: Math.ceil(count/pageSize)});
})

// @desc     Register user
// @route    POST /api/users/
// @access   Public
const registerUser = asyncHandler(async(req,res) =>{
    const{username,email,password} = req.body;

    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400);
        throw new Error("That email is already in use.");
    }

    const usernameExists = await User.findOne({username});
    if(usernameExists){
        res.status(400);
        throw new Error("Username already active.");
    }
    const user = await User.create({
        username,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = async(req,res) =>{
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            wishlist: user.wishlist,
            cartItems: user.cartItems,
            shippingAddress: user.shippingAddress,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404);
        // throw Error("User not found.");
    }
}

// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler( async(req, res) =>{
    const user = await User.findById(req.user._id);
    
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
        user.cartItems = req.body.cartItems || user.cartItems;
        user.wishlist = req.body.wishlist || user.wishlist;

        if(req.body.password){
            user.password = req.body.password
        }

        try{
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                shippingAddress: updatedUser.shippingAddress,
                cartItems: updatedUser.cartItems,
                wishlist: updatedUser.wishlist,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }catch(error){
            console.log(error);
        }
    }else{
        res.status(404);
        throw new Error("User not found.");
    }
})

// @desc     Delete a user
// @route    DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = async (req,res) =>{
    const user = await User.findById(req.params.id);

    if(user){
        await user.remove();
        res.json({message: "User removed."});
    }else{
        res.status(404);
        res.json("User not found.");
    }
}


// @desc     Get a user by ID
// @route    GET /api/users/:id
// @access   Private/Admin
const getUserById = async (req, res) =>{
    const user = await User.findById(req.params.id);

    if(user){
        res.json(user);
    }else{
        res.status(404);
        res.json("User not found.");
    }
}

// @desc     Update user
// @route    PUT /api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
        
        if(req.body.isAdmin || req.body.isAdmin===false){
            user.isAdmin = req.body.isAdmin;
        }

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                shippingAddress: updatedUser.shippingAddress,
                isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        res.json("User not found.");
    }
})

module.exports = {loginUser, getUsers, registerUser, getUserProfile, updateUserProfile, deleteUser,getUserById, updateUser};