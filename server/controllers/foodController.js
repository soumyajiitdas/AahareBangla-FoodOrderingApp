const Food = require('../models/Food');

// Seed the database with initial food items
const seedFoods = async (req, res) => {
    try {
        await Food.deleteMany(); // Clear existing food items
        const foods = [
            // Appetizers
            { name: 'Chicken Wings', price: 8.99, category: 'Appetizers', description: 'Crispy fried chicken wings with BBQ sauce', image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400', isVeg: false },
            { name: 'Spring Rolls', price: 6.99, category: 'Appetizers', description: 'Vegetable spring rolls with sweet chili sauce', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400', isVeg: true },
            { name: 'Nachos Supreme', price: 9.99, category: 'Appetizers', description: 'Loaded nachos with cheese, jalapeños, and sour cream', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400', isVeg: true },
            { name: 'Mozzarella Sticks', price: 7.99, category: 'Appetizers', description: 'Golden fried mozzarella sticks with marinara sauce', image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400', isVeg: true },
            { name: 'Garlic Bread', price: 5.99, category: 'Appetizers', description: 'Toasted bread with garlic butter and herbs', image: 'https://images.unsplash.com/photo-1573140401552-388e68c0fc39?w=400', isVeg: true },
            { name: 'Crispy Calamari', price: 10.99, category: 'Appetizers', description: 'Deep-fried squid rings with lemon aioli', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', isVeg: false },
            
            // Main Course
            { name: 'Margherita Pizza', price: 12.99, category: 'Main Course', description: 'Classic pizza with tomato sauce, mozzarella, and basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', isVeg: true },
            { name: 'Grilled Chicken Burger', price: 11.99, category: 'Main Course', description: 'Juicy grilled chicken patty with lettuce and mayo', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', isVeg: false },
            { name: 'Spaghetti Carbonara', price: 13.99, category: 'Main Course', description: 'Creamy pasta with bacon and parmesan cheese', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', isVeg: false },
            { name: 'Paneer Tikka Masala', price: 12.99, category: 'Main Course', description: 'Indian cottage cheese in rich tomato curry', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', isVeg: true },
            { name: 'Fish and Chips', price: 14.99, category: 'Main Course', description: 'Battered fish fillet with crispy fries', image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400', isVeg: false },
            { name: 'Vegetable Biryani', price: 11.99, category: 'Main Course', description: 'Fragrant rice with mixed vegetables and spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', isVeg: true },
            
            // Desserts
            { name: 'Chocolate Lava Cake', price: 6.99, category: 'Desserts', description: 'Warm chocolate cake with molten center', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', isVeg: true },
            { name: 'Tiramisu', price: 7.99, category: 'Desserts', description: 'Classic Italian coffee-flavored dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', isVeg: true },
            { name: 'Cheesecake', price: 7.49, category: 'Desserts', description: 'Creamy New York style cheesecake', image: 'https://images.unsplash.com/photo-1533134242820-b0cc6e7b3b05?w=400', isVeg: true },
            { name: 'Ice Cream Sundae', price: 5.99, category: 'Desserts', description: 'Vanilla ice cream with chocolate sauce and nuts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', isVeg: true },
            { name: 'Gulab Jamun', price: 4.99, category: 'Desserts', description: 'Sweet Indian dessert balls in sugar syrup', image: 'https://images.unsplash.com/photo-1589882289884-cc0c7a5b0c2a?w=400', isVeg: true },
            
            // Beverages
            { name: 'Fresh Lime Soda', price: 3.99, category: 'Beverages', description: 'Refreshing lime juice with soda', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400', isVeg: true },
            { name: 'Mango Lassi', price: 4.99, category: 'Beverages', description: 'Creamy yogurt drink with mango', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', isVeg: true },
            { name: 'Cold Coffee', price: 4.49, category: 'Beverages', description: 'Chilled coffee with milk and ice cream', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', isVeg: true },
            { name: 'Green Tea', price: 2.99, category: 'Beverages', description: 'Healthy antioxidant green tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', isVeg: true },
            { name: 'Strawberry Smoothie', price: 5.49, category: 'Beverages', description: 'Fresh strawberry blended smoothie', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400', isVeg: true },
            { name: 'Coca Cola', price: 2.49, category: 'Beverages', description: 'Classic cola drink', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', isVeg: true }
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