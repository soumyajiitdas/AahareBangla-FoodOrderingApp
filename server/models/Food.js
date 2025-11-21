const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages']
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isVeg: {
        type: Boolean,
        default: true
    }
});

// Add unique compound index to prevent duplicate items
FoodSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Food', FoodSchema);