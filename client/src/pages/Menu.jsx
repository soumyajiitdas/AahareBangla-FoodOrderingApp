import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import FoodCard from '../components/FoodCard';
import { Loader, SlidersHorizontal } from 'lucide-react';

const Menu = ({ searchQuery }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [vegFilter, setVegFilter] = useState('all'); // 'all', 'veg', 'non-veg'
    const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high'
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

    // Filter and sort foods
    const getFilteredFoods = () => {
        let filtered = foods;

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((food) => food.category === selectedCategory);
        }

        // Veg/Non-veg filter
        if (vegFilter === 'veg') {
            filtered = filtered.filter((food) => food.isVeg);
        } else if (vegFilter === 'non-veg') {
            filtered = filtered.filter((food) => !food.isVeg);
        }

        // Search filter
        if (searchQuery && searchQuery.trim()) {
            filtered = filtered.filter(
                (food) =>
                    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    food.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        return filtered;
    };

    const filteredFoods = getFilteredFoods();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50" data-testid="loading-spinner">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading delicious food...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50" data-testid="error-message">
                <div className="text-center">
                    <p className="text-red-600 text-xl mb-4">Error: {error}</p>
                    <button
                        onClick={fetchFoods}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="menu-title">
                        Order Food Online
                    </h1>
                    <p className="text-gray-600">
                        {filteredFoods.length} dishes available
                    </p>
                </div>

                {/* Category Filter - Horizontal Scroll */}
                <div className="mb-6 overflow-x-auto" data-testid="category-filter">
                    <div className="flex space-x-3 pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                data-testid={`category-filter-${category.toLowerCase().replace(' ', '-')}`}
                                className={`px-5 py-2 rounded-full font-medium transition-all whitespace-nowrap ${selectedCategory === category
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-red-600 hover:text-red-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-700">Filters:</span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {/* Veg/Non-veg Filter */}
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                <button
                                    onClick={() => setVegFilter('all')}
                                    data-testid="filter-all"
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${vegFilter === 'all'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setVegFilter('veg')}
                                    data-testid="filter-veg"
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${vegFilter === 'veg'
                                            ? 'bg-white text-green-700 shadow-sm'
                                            : 'text-gray-600 hover:text-green-700'
                                        }`}
                                >
                                    <div className="w-3 h-3 border-2 border-green-600 rounded flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                    </div>
                                    <span>Veg</span>
                                </button>
                                <button
                                    onClick={() => setVegFilter('non-veg')}
                                    data-testid="filter-non-veg"
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${vegFilter === 'non-veg'
                                            ? 'bg-white text-red-700 shadow-sm'
                                            : 'text-gray-600 hover:text-red-700'
                                        }`}
                                >
                                    <div className="w-3 h-3 border-2 border-red-600 rounded flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                                    </div>
                                    <span>Non-Veg</span>
                                </button>
                            </div>

                            {/* Sort Filter */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                data-testid="sort-select"
                                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                                <option value="default">Sort By</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Food Grid */}
                {filteredFoods.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl" data-testid="no-items-message">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-xl text-gray-600 mb-2">No dishes found</p>
                        <p className="text-gray-500">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="food-grid">
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