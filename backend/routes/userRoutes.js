const express = require('express');
const { loginUser, getUsers, registerUser, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser } = require('../controllers/userController');
const {protect, admin} = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/login',loginUser)

router.route('/')
    .get(protect, admin, getUsers)
    .post(registerUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)




module.exports = router;