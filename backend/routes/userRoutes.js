const express = require("express");
const rateLimit = require("express-rate-limit");
const {
    loginUser,
    getUsers,
    registerUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser,
} = require("../controllers/userController");
const { protect, admin, isLoggedIn, logout } = require("../middleware/authMiddleware");
const router = express.Router();

const loginLimiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000,
    message: "Exceeded number of login attempts. Try again in an hour.",
});

router.post("/login", loginLimiter, loginUser);

router.get("/isLoggedIn", isLoggedIn);
router.get("/logout", logout);

router.route("/").get(protect, admin, getUsers).post(registerUser);

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;
