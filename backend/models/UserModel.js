const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "demo-user"],
            default: "user",
        },

        wishlist: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                flavourImage: { type: String },
                category: { type: String, required: true },
                productType: { type: String, required: true },
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        cartItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                flavourImage: { type: String },
                category: { type: String, required: true },
                productType: { type: String, required: true },
                price: { type: Number, required: true, default: 0 },
                countInStock: { type: Number, required: true, default: 0 },
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        shippingAddress: {
            address: String,
            city: String,
            province: String,
            postalCode: String,
            country: String,
        },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Before we save, encrypt the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

module.exports = User;
