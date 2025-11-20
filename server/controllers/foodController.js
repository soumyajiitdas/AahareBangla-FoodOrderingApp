
const Food = require('../models/Food');

// Seed the database with initial food items
const seedFoods = async (req, res) => {
    try {
        await Food.deleteMany(); // Clear existing food items
        const foods = [
            { name: 'Pizza', price: 12.99 },
            { name: 'Burger', price: 8.99 },
            { name: 'Pasta', price: 10.99 },
            { name: 'Salad', price: 6.99 }
        ];
        await Food.insertMany(foods);
        res.status(201).send('Food items seeded successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    seedFoods,
    getFoods
};
