const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const stripe = require ('stripe')(process.env.STRIPE_PRIVATE_KEY);

const convertToCents = (price) =>{
    return price*100;
}

const router = express.Router();


router.post('/sessions', async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/ordersuccess/`,
            cancel_url: `${process.env.CLIENT_URL}`,
            line_items: req.body.map((item)=>{
                return {
                    price_data: {
                        currency: 'cad', 
                        product_data: {
                            name: item.name
                        },
                        unit_amount: convertToCents(item.price)
                    },
                    quantity: item.quantity
                    
                }
            })
        })
        res.json({url: session.url, id: session.id, payment_status: session.payment_status});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/sessions/:id', async (req,res)=>{
    try{
        const session = await stripe.checkout.sessions.retrieve(req.params.id);
        res.json(session);
    }catch(error){
        res.status(404).json(error);
    }
})

module.exports = router;