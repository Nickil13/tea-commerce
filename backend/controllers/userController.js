const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");
const sendCookie = require("../utils/sendCookie");
const asyncHandler = require("express-async-handler");

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        sendCookie(token, res);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            wishlist: user.wishlist,
            cartItems: user.cartItems,
            shippingAddress: user.shippingAddress,
            token,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});

// @desc     Get all users
// @route    GET /api/users/
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    let query = {};

    //Query by keyword
    if (req.query.keyword) {
        query = {
            ...query,
            username: {
                $regex: req.query.keyword,
                $options: "i",
            },
        };
    }
    const count = await User.countDocuments({ ...query });
    const users = await User.find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc     Register user
// @route    POST /api/users/
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error("That email is already in use.");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(400);
        throw new Error("Username already active.");
    }
    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        const token = generateToken(user._id);
        sendCookie(token, res);
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            wishlist: user.wishlist,
            cartItems: user.cartItems,
            shippingAddress: user.shippingAddress,
        });
    } else {
        res.status(404);
        throw Error("User not found.");
    }
};

// @desc     Update current user
// @route    PUT /api/users/currentUser
// @access   Private
const updateCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.cartItems = req.body.cartItems || user.cartItems;
        user.wishlist = req.body.wishlist || user.wishlist;

        try {
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                shippingAddress: updatedUser.shippingAddress,
                cartItems: updatedUser.cartItems,
                wishlist: updatedUser.wishlist,
                token: generateToken(updatedUser._id),
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

// @desc     Update user profile (username, pswd, shippingAddress)
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const usernameExists = await User.find({ username: req.body.username });
        const emailExists = await User.find({ email: req.body.email });

        if (
            usernameExists.length > 0 &&
            usernameExists[0].username !== user.username
        ) {
            res.status(400);
            throw new Error("Username already in use.");
        }
        if (emailExists.length > 0 && emailExists[0].email !== user.email) {
            res.status(400);
            throw new Error("Email already in use.");
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;

        if (req.body.password) {
            user.password = req.body.password;
        }

        try {
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                shippingAddress: updatedUser.shippingAddress,
                cartItems: updatedUser.cartItems,
                wishlist: updatedUser.wishlist,
                token: generateToken(updatedUser._id),
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

// @desc     Delete a user
// @route    DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "User removed." });
    } else {
        res.status(404);
        res.json("User not found.");
    }
};

// @desc     Get a user by ID
// @route    GET /api/users/:id
// @access   Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        res.json("User not found.");
    }
};

// @desc     Update user
// @route    PUT /api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            shippingAddress: updatedUser.shippingAddress,
        });
    } else {
        res.status(404);
        res.json("User not found.");
    }
});

module.exports = {
    loginUser,
    getUsers,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateCurrentUser,
    deleteUser,
    getUserById,
    updateUser,
};
