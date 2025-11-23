const Food = require('../models/Food');

// Seed the database with initial food items
const seedFoods = async (req, res) => {
    try {
        // Use upsert to prevent duplicates instead of deleting all
        const foods = [
            // Appetizers
            { name: 'Chicken Wings', price: 229, category: 'Appetizers', description: 'Crispy fried chicken wings with BBQ sauce', image: 'https://i.ytimg.com/vi/ICfdNnyv39Q/hq720.jpg?w=400', isVeg: false },
            { name: 'Spring Rolls', price: 179, category: 'Appetizers', description: 'Vegetable spring rolls with sweet chili dipping sauce', image: 'https://hot-thai-kitchen.com/wp-content/uploads/2021/03/veggie-spring-rolls-blog.jpg?w=400', isVeg: true },
            { name: 'Mozzarella Sticks', price: 179, category: 'Appetizers', description: 'Breaded mozzarella sticks with marinara sauce', image: 'https://static.india.com/wp-content/uploads/2024/09/mozarella-sticks.jpg##image/jpg?w=400', isVeg: true },
            { name: 'Bruschetta', price: 199, category: 'Appetizers', description: 'Grilled bread topped with tomato, basil & garlic', image: 'https://static01.nyt.com/images/2020/05/12/dining/as-tomato-bruschetta/as-tomato-bruschetta-threeByTwoMediumAt2X.jpg?w=400', isVeg: true },
            { name: 'Pakora', price: 99, category: 'Appetizers', description: 'Crispy Indian fritters made with vegetables and gram flour', image: 'https://images.services.kitchenstories.io/I1J1RunmQ7cK6OjgqkyO5GK1_6o=/3840x0/filters:quality(80)/images.kitchenstories.io/wagtailOriginalImages/R2386-photo-final-3.jpg?w=400', isVeg: true },


            // Main Course
            { name: 'Paneer Butter Masala', price:179, category: 'Main Course', description: 'Cottage cheese in a rich, creamy tomato-butter gravy', image: 'https://www.shanazrafiq.com/wp-content/uploads/2012/10/1-DSC_0040.jpg?w=400', isVeg: true },
            { name: 'Butter Chicken', price: 249, category: 'Main Course', description: 'Tandoori chicken simmered in a creamy tomato and butter gravy', image: 'https://www.marionskitchen.com/wp-content/uploads/2024/02/20240212_MK_Easiest-Butter-Chicken-From-Scratch-2-1200x900.webp?w=400', isVeg: false },
            { name: 'Kadai Paneer', price: 165, category: 'Main Course', description: 'Paneer cubes cooked with bell peppers, onions and spices in a kadai-style gravy', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjnoyfscmXjTOZndVEfyDFblNTdtr3Buk78Q&s?w=400', isVeg: true },
            { name: 'Dal Makhani', price: 155, category: 'Main Course', description: 'Slow-cooked black lentils in a buttery, creamy sauce', image: 'https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg?w=400', isVeg: true },
            { name: 'Chicken Biryani', price: 219, category: 'Main Course', description: 'Aromatic basmati rice cooked with tender chicken and spices', image: 'https://vismaifood.com/storage/app/uploads/public/914/f47/fa9/thumb__1200_0_0_0_auto.jpg?w=400', isVeg: false },
            { name: 'Mutton Biryani', price: 319, category: 'Main Course', description: 'Tender mutton with aromatic basmati rice cocked with spices', image: 'https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg?w=400', isVeg: false },
            { name: 'Fish Curry', price: 199, category: 'Main Course', description: 'Coastal-style fish curry made with coconut, tamarind, and spices', image: 'https://www.thedeliciouscrescent.com/wp-content/uploads/2023/07/Fish-Curry-4.jpg?w=400', isVeg: false },
            { name: 'Veg Fried Rice with Paneer', price: 219, category: 'Main Course', description: 'Fragrant basmati rice cooked with mixed vegetables and mild spices', image: 'https://i.ytimg.com/vi/AYkSNH5Sj4M/hq720.jpg?w=400', isVeg: true },
            { name: 'Chole Bhature', price: 159, category: 'Main Course', description: 'Spicy Punjabi chickpea curry served with fluffy fried bhature', image: 'https://lh3.googleusercontent.com/proxy/f1AVD_bMmd3qK65M6BCk5a-9OJkuJHu5wZjkPumm1Ef2GCRWsAOwEgL1aYaYOPqCVYImVU74ktUY_iDGnQn0QjRowRxvtbqxqqC1a26Vu3vu0d0XSrTehbRGiUQRUpymqGkGCZTIM5-xrA?w=400', isVeg: true },

            // Desserts
            { name: 'Gulab Jamun', price: 119, category: 'Desserts', description: 'Soft milk-dumplings soaked in rose-cardamom sugar syrup', image: 'https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg?w=400', isVeg: true },
            { name: 'Kheer', price: 119, category: 'Desserts', description: 'Creamy rice pudding flavored with cardamom and garnished with nuts', image: 'https://images.herzindagi.info/image/2023/Oct/carrot-kheer-easy-recipe-for-diwali-2023.jpg?w=400', isVeg: true },
            { name: 'Mishti Doi', price: 99, category: 'Desserts', description: 'Sweet Bengali-style thickened curd', image: 'https://cdn.prod.website-files.com/64931d2aee18510b47f4bb1f/6685ac20f1316f7a50ffe27c_Mishti-Doi-Recipe-Cover-Image.jpg?w=400', isVeg: true },
            { name: 'Rasgulla', price: 99, category: 'Desserts', description: 'Soft, spongy cottage cheese balls soaked in light sugar syrup', image: 'https://madhurasrecipe.com/wp-content/uploads/2023/10/Rasgulla-Featured-Image.jpg?w=400', isVeg: true },
            { name: 'Brownie with Ice Cream', price: 189, category: 'Desserts', description: 'Warm chocolate brownie served with a scoop of vanilla ice cream', image: 'https://dirtydishesmessykisses.com/wp-content/uploads/2024/10/brownie-sundae-recipe-1730416956.jpg?w=400', isVeg: true },
            { name: 'Rabri', price: 139, category: 'Desserts', description: 'Thickened sweetened milk flavored with saffron and cardamom', image: 'https://cookwithparul.com/wp-content/uploads/2021/03/maxresdefault-1-5.jpg?w=400', isVeg: true },
            { name: 'Ice Cream Sundae', price: 199, category: 'Desserts', description: 'Layered ice cream sundae topped with nuts, chocolate syrup, and cherries', image: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2022/02/9/0/KC3004_katie-lee-biegel-edible-cereal-treat-bowls-for-ice-cream-sundae-2_s4x3.jpg?w=400', isVeg: true },
            { name: 'Rasmalai', price: 159, category: 'Desserts', description: 'Flattened chenna patties served in saffron cardamom milk', image: 'https://rachnas-kitchen.com/wp-content/uploads/2017/07/rasmalai-2-e1505245876472-gpo.jpg?w=400', isVeg: true },
            { name: 'Fruit Custard', price: 139, category: 'Desserts', description: 'Mixed seasonal fruits served in chilled vanilla custard', image: 'https://passion2cook.com/wp-content/uploads/2024/03/fruit-custard-2-1024x576.jpg?w=400', isVeg: true },

            // Beverages
            { name: 'Masala Chai', price: 39, category: 'Beverages', description: 'Strong Indian tea brewed with milk, spices, and ginger', image: 'https://images.unsplash.com/photo-1683533699004-7f6b9e5a073f?w=400', isVeg: true },
            { name: 'Cold Coffee', price: 69, category: 'Beverages', description: 'Chilled blended coffee with milk, sugar, and ice', image: 'https://images.unsplash.com/photo-1625242662341-5e92c5101338?w=400', isVeg: true },
            { name: 'Fresh Lime Soda', price: 59, category: 'Beverages', description: 'Refreshing soda with fresh lime juice, available sweet or salted', image: 'https://plus.unsplash.com/premium_photo-1661510500212-e3d96478a574?w=400', isVeg: true },
            { name: 'Mango Lassi', price: 99, category: 'Beverages', description: 'Thick yogurt drink blended with ripe mango pulp', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', isVeg: true },
            { name: 'Sweet Lassi', price: 79, category: 'Beverages', description: 'Classic Punjabi lassi made with sweetened yogurt', image: 'https://images.unsplash.com/photo-1527406619566-0159590b8540?w=400', isVeg: true },
            { name: 'Orange Juice', price: 59, category: 'Beverages', description: 'Freshly squeezed orange juice, full of vitamin C', image: 'https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?w=400', isVeg: true },
        ];

        // Use bulkWrite with upsert to prevent duplicates
        const operations = foods.map(food => ({
            updateOne: {
                filter: { name: food.name, category: food.category },
                update: { $set: food },
                upsert: true
            }
        }));

        await Food.bulkWrite(operations);
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