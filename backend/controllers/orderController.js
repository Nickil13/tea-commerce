const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');


// @desc     Get logged in user orders
// @route    GET /api/orders/myorders
// @access   Private
const getMyOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
    
})

// @desc     Get order by id
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = async(req, res)=>{
    const order = await Order.findById({
        _id: req.params.id
    })
    if(order){
        res.json(order);
    }else{
        res.status(404).json("Order not found.");
    }
}

// @desc     Create a new order
// @route    POST /api/orders
// @access   Private
const createOrder = async(req,res)=>{
    const {cartItems, shippingInfo, paymentMethod, subtotal, taxes, shipping, total} = req.body;
    
    if(cartItems && cartItems.length === 0){
        res.status(400).json("No order items.");
    }else{
        const order = new Order({
            user: req.user._id,
            orderItems: cartItems,
            shippingAddress: shippingInfo,
            paymentMethod,
            subtotal,
            taxPrice: taxes,
            shippingPrice: shipping,
            totalPrice: total
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
}



module.exports = {getMyOrders, getOrderById, createOrder};