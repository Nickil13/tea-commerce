const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes.js');
const stripeRoutes = require('./routes/stripeRoutes');

dotenv.config();
connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/stripe', stripeRoutes);

app.use('/', (req,res)=>{
    res.send('API is running!')
})



const PORT = process.env.PORT || 5000;
app.listen(
    PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)