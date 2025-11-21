const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

const placeOrder = async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('food');
        if (cartItems.length === 0) {
            return res.status(400).send('Cart is empty');
        }

        let total = 0;
        const orderItems = cartItems.map(item => {
            const itemTotal = item.food.price * item.quantity;
            total += itemTotal;
            return {
                food: item.food._id,
                quantity: item.quantity
            };
        });

        const newOrder = new Order({
            items: orderItems,
            total: total
        });

        await newOrder.save();
        await CartItem.deleteMany();

        // Populate order details before sending response
        const populatedOrder = await Order.findById(newOrder._id).populate('items.food');
        res.status(201).json(populatedOrder);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    placeOrder
};