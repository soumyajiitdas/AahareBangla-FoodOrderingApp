const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

// Ensure each user can have only one cart item per food
CartItemSchema.index({ user: 1, food: 1 }, { unique: true });

module.exports = mongoose.model('CartItem', CartItemSchema);