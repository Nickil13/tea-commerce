const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    max: 20,
    windowMs: 60 * 60 * 1000,
    message: "Exceeded number of login attempts. Try again in an hour.",
});

const APILimiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour.",
});

module.exports = { loginLimiter, APILimiter };
