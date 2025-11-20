
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
