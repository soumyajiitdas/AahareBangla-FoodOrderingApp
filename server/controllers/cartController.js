
const CartItem = require('../models/CartItem');
const Food = require('../models/Food');

const getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('food');
        res.json(cartItems);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).send('Food not found');
        }

        let cartItem = await CartItem.findOne({ food: foodId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new CartItem({
                food: foodId,
                quantity: quantity
            });
        }

        await cartItem.save();
        res.status(201).send('Food added to cart');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getCart,
    addToCart
};
