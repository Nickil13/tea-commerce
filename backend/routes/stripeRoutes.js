const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const stripe = require ('stripe')(process.env.STRIPE_PRIVATE_KEY);

const convertToCents = (price) =>{
    return parseInt(price*100);
}

const router = express.Router();


router.post('/sessions', async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/order-success/${req.body.orderId}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}`,
            line_items: [...req.body.cartItems.map((item)=>{
                return {
                    price_data: {
                        currency: 'cad', 
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: convertToCents(item.price)
                    },
                    quantity: item.quantity
                    
                }
            }),
                {
                    price_data: {
                        currency: 'cad', 
                        product_data: {
                            name: 'shipping',
                        },
                        unit_amount: convertToCents(req.body.shipping || 0)
                    },
                    quantity: 1
                    
                },
                {
                    price_data: {
                        currency: 'cad', 
                        product_data: {
                            name: 'taxes',
                        },
                        unit_amount: convertToCents(req.body.taxes || 0)
                    },
                    quantity: 1
                    
                }
            ]
        })
        res.json({url: session.url, id: session.id, payment_status: session.payment_status});

    }catch(error){
        res.status(500).json({error: error.message});
        console.log(error);
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

router.get('/sessions/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
})

module.exports = router;