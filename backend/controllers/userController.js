const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    console.log(user);
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
    const users = await User.find({});
    res.json(users);
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
    console.log(req.body);
    if(user){
        console.log("1:" + user);
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
        user.wishlist = req.body.wishlist || user.wishlist;
        
        if(req.body.password){
            user.password = req.body.password
        }

        console.log("2:" + user);

        try{
            const updatedUser = await user.save();
            console.log(updatedUser);
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                shippingAddress: updatedUser.shippingAddress,
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
// @route    POST /api/users/:id
// @access   Private/Admin
const deleteUser = () =>{
    
}


// @desc     Get a user by ID
// @route    GET /api/users/:id
// @access   Private/Admin
const getUserById = () =>{
    
}
// @desc     Login user
// @route    POST /api/users/:id
// @access   Private/Admin
const updateUser = () =>{
    
}


module.exports = {loginUser, getUsers, registerUser, getUserProfile, updateUserProfile, deleteUser,getUserById, updateUser};