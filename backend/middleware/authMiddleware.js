const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    } else if (req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error("Not authorized.");
        }
        next();
    };
};

// @desc     Check if user is logged in
// @route    GET /api/users/isLoggedIn
// @access   Public
const isLoggedIn = asyncHandler(async (req, res) => {
    if (req.cookies.jwt) {
        // Verify token
        let token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            res.status(401);
            throw new Error("User does not match cookie.");
        }

        // User is logged in
        req.user = currentUser;

        res.json({
            _id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role,
            wishlist: currentUser.wishlist,
            cartItems: currentUser.cartItems,
            shippingAddress: currentUser.shippingAddress,
        });
    } else {
        res.json(null);
    }
});

// @desc     Log the user out
// @route    GET /api/users/logout
// @access   Public
const logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ message: "logging out" });
};

module.exports = { protect, restrictTo, isLoggedIn, logout };
