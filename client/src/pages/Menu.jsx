import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import FoodCard from '../components/FoodCard';
import { Loader } from 'lucide-react';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [seeded, setSeeded] = useState(false);

    const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            setLoading(true);
            const data = await api.getFoods();

            // If no foods, seed the database
            if (data.length === 0 && !seeded) {
                await api.seedFoods();
                const newData = await api.getFoods();
                setFoods(newData);
                setSeeded(true);
            } else {
                setFoods(data);
            }
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredFoods =
        selectedCategory === 'All'
            ? foods
            : foods.filter((food) => food.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
                <Loader className="w-12 h-12 text-orange-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" data-testid="error-message">
                <div className="text-center">
                    <p className="text-red-600 text-xl mb-4">Error: {error}</p>
                    <button
                        onClick={fetchFoods}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="menu-title">
                        Our Menu
                    </h1>
                    <p className="text-xl text-gray-600">
                        Explore our delicious collection of authentic dishes
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-8" data-testid="category-filter">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            data-testid={`category-filter-${category.toLowerCase().replace(' ', '-')}`}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Food Grid */}
                {filteredFoods.length === 0 ? (
                    <div className="text-center py-12" data-testid="no-items-message">
                        <p className="text-xl text-gray-600">No items found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="food-grid">
                        {filteredFoods.map((food) => (
                            <FoodCard key={food._id} food={food} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;