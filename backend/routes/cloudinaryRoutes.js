const express = require('express');
const {protect, admin} = require('../middleware/authMiddleware');
const { cloudinary } = require('../utils/cloudinary');

const router = express.Router();

// Cloudinary routes

// @desc    Upload an image to cloudinary
// @route   POST /api/cloudinary/upload
// @access  Private/Admin
router.post('/upload', async (req, res)=>{
    
    try{
        const fileStr = req.body.data;
        const fileName = req.body.file_name;

        const uploadedResponse = await cloudinary.uploader.upload(
            fileStr, {
                folder: 'tea-commerce',
                use_filename: true,
                unique_filename: false,
                filename_override: fileName
            }
        )
        res.json({
            uploadedResponse, msg: "Successfully uploaded the image!"
        });

    }catch(error){
        console.error(error);
        res.status(500);
    }
})


module.exports = router;