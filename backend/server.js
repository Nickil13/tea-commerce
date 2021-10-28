const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const cloundinaryRoutes = require('./routes/cloudinaryRoutes');

dotenv.config();
connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cloudinary', cloundinaryRoutes);
app.use('/api/stripe', stripeRoutes);

app.use('/', (req,res)=>{
    res.send('API is running!')
})


//Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)