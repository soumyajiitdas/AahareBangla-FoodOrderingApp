const CartItem = require('../models/CartItem');
const Food = require('../models/Food');

const getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user: req.user.id }).populate('food');
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        let cartItem = await CartItem.findOne({ user: req.user.id, food: foodId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new CartItem({
                user: req.user.id,
                food: foodId,
                quantity: quantity
            });
        }

        await cartItem.save();
        res.status(201).json({ message: 'Food added to cart', cartItem });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cartItem = await CartItem.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity <= 0) {
            await cartItem.deleteOne();
            return res.status(200).json({ message: 'Item removed from cart' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cart updated', cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const clearCart = async (req, res) => {
    try {
        await CartItem.deleteMany({ user: req.user.id });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};