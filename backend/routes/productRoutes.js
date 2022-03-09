const express = require("express");
const {
    getProducts,
    getProductById,
    createProductReview,
    getTopProductReview,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router
    .route("/")
    .get(getProducts)
    .post(protect, restrictTo("admin"), createProduct);

router.get("/:id/reviews/top-review", getTopProductReview);

router.route("/:id/reviews").post(protect, createProductReview);

router
    .route("/:id")
    .get(getProductById)
    .put(protect, restrictTo("admin"), updateProduct)
    .delete(protect, restrictTo("admin"), deleteProduct);

module.exports = router;
