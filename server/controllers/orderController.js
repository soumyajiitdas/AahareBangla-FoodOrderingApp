
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getBill = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('items.food');
        if (!order) {
            return res.status(404).send('Order not found');
        }

        const doc = new PDFDocument();
        const billPath = `bill-${order._id}.pdf`;
        const stream = fs.createWriteStream(billPath);
        doc.pipe(stream);

        doc.fontSize(25).text('Bill', { align: 'center' });
        doc.moveDown();

        order.items.forEach(item => {
            const itemTotal = item.food.price * item.quantity;
            doc.fontSize(15).text(`${item.food.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`);
        });

        doc.moveDown();
        doc.fontSize(20).text(`Total: $${order.total.toFixed(2)}`, { align: 'right' });

        doc.end();

        stream.on('finish', () => {
            res.download(billPath);
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports = {
    placeOrder,
    getBill
};
