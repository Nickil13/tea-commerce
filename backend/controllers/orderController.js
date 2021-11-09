const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');


// @desc     Get logged in user orders
// @route    GET /api/orders/myorders
// @access   Private
const getMyOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
    
})

// @desc     Get all orders
// @route    GET /api/orders/
// @access   Private/Admin
const getOrders = asyncHandler(async (req, res) =>{
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    if(req.query.keyword){
        try{
            const count = await Order.countDocuments({_id: req.query.keyword});
            const order = await Order.findById(req.query.keyword).limit(pageSize).skip(pageSize * (page-1));

            res.json({orders: [order], page, pages: Math.ceil(count/pageSize)});

        }catch(error){
            res.status(400);
            throw new Error("Invalid order ID");
        }
    }else{
        const count = await Order.countDocuments({});
        const orders = await Order.find({}).limit(pageSize).skip(pageSize * (page-1));
    
        res.json({orders, page, pages: Math.ceil(count/pageSize)});
    }
    
    
})


// @desc     Get order by id
// @route    GET /api/orders/:id
// @access   Private/Admin
const getOrderById = async(req, res)=>{
    const order = await Order.findById({
        _id: req.params.id
    }).populate('user', 'id username');
    if(order){
        res.json(order);
    }else{
        res.status(404).json("Order not found.");
    }
}

// @desc     Get a user's order by id
// @route    GET /api/orders/myorders/:id
// @access   Private
const getMyOrderById = async(req, res)=>{
    const orders = await Order.find({user: req.user._id}).find({_id: req.params.id}).populate('user', 'id username');
    
    if(orders && orders.length>0){
        const order = orders[0];
        res.json(order);
    }else{
        res.status(404).json("Order not found.");
    }
}

// @desc     Create a new order
// @route    POST /api/orders
// @access   Private
const createOrder = async(req,res)=>{
    const {cartItems, shippingAddress, paymentMethod, subtotal, taxes, shipping, total} = req.body;
    
    if(cartItems && cartItems.length === 0){
        res.status(400).json("No order items.");
    }else{
        const order = new Order({
            user: req.user._id,
            orderItems: cartItems,
            shippingAddress,
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

// @desc     Update order to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
const updateOrderToPaid = asyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id);
    
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.customer_details.email
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
})

// @desc     Update order to delivered
// @route    PUT /api/orders/:id/deliver
// @access   Private/Admin
const updateOrderToDelivered = asyncHandler( async(req, res)=>{
    const order = await Order.findById(req.params.id);
    console.log('inside to be delivered');
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
})

module.exports = {getMyOrders, getOrders, getMyOrderById, getOrderById, createOrder, updateOrderToPaid, updateOrderToDelivered};