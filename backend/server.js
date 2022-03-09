const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const { APILimiter } = require("./utils/limiters");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//  Limit number of API requests
app.use("/api", APILimiter);

// Body & Cookie parsers
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Data sanitization
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/stripe", stripeRoutes);

if (process.env.NODE_ENV === "production") {
    console.log("In production!");
    app.use(express.static(path.join(path.resolve(), "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "client", "build", "index.html")
        );
    });
} else {
    app.use("/", (req, res) => {
        res.send("API is running!");
    });
}

//Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
