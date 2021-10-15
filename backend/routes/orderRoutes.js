const express = require('express');
const { getMyOrders, getOrderById, createOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(createOrder);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);


module.exports = router;