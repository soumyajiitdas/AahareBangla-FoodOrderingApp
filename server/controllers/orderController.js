const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

const placeOrder = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user: req.user.id }).populate('food');
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
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
            user: req.user.id,
            items: orderItems,
            total: total
        });

        await newOrder.save();
        await CartItem.deleteMany({ user: req.user.id });

        // Populate order details before sending response
        const populatedOrder = await Order.findById(newOrder._id).populate('items.food');
        res.status(201).json(populatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.food')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id, 
            user: req.user.id 
        }).populate('items.food');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    placeOrder,
    getOrders,
    getOrderById
};