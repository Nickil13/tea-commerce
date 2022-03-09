const express = require("express");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const {
    getMyOrders,
    getOrderById,
    createOrder,
    getMyOrderById,
    updateOrderToPaid,
    getOrders,
    updateOrderToDelivered,
} = require("../controllers/orderController");

const router = express.Router();

router
    .route("/")
    .post(protect, createOrder)
    .get(protect, restrictTo("admin"), getOrders);

router.get("/myorders/:id", protect, getMyOrderById);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/pay", protect, updateOrderToPaid);

router.put(
    "/:id/deliver",
    protect,
    restrictTo("admin"),
    updateOrderToDelivered
);
router.route("/:id").get(protect, restrictTo("admin"), getOrderById);

module.exports = router;
