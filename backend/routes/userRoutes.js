const express = require("express");
const { loginLimiter } = require("../utils/limiters");
const {
    loginUser,
    getUsers,
    registerUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser,
    updateCurrentUser,
} = require("../controllers/userController");
const {
    protect,
    restrictTo,
    isLoggedIn,
    logout,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginLimiter, loginUser);

router.get("/isLoggedIn", isLoggedIn);
router.get("/logout", logout);

router
    .route("/")
    .get(protect, restrictTo("admin"), getUsers)
    .post(registerUser);

router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, restrictTo("admin", "user"), updateUserProfile);

router.route("/currentUser").put(protect, updateCurrentUser);

router
    .route("/:id")
    .delete(protect, restrictTo("admin"), deleteUser)
    .get(protect, restrictTo("admin"), getUserById)
    .put(protect, restrictTo("admin"), updateUser);

module.exports = router;
