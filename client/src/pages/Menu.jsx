import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import FoodCard from '../components/FoodCard';
import { Loader, Search, ChevronDown } from 'lucide-react';

const Menu = ({ searchQuery }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [vegFilter, setVegFilter] = useState('all');         // 'all', 'veg', 'non-veg'
    const [sortBy, setSortBy] = useState('default');            // 'default', 'price-low', 'price-high'
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
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-red-50/30 to-gray-50" data-testid="loading-spinner">
                <div className="text-center">
                    <Loader className="w-16 h-16 text-red-600 animate-spin mx-auto mb-6" />
                    <p className="text-gray-600 text-lg font-medium">Loading delicious food...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-red-50/30 to-gray-50" data-testid="error-message">
                <div className="text-center bg-white rounded-3xl shadow-xl p-12">
                    <div className="text-6xl mb-6">😞</div>
                    <p className="text-red-600 text-xl font-semibold mb-6">Oops! {error}</p>
                    <button
                        onClick={fetchFoods}
                        className="bg-linear-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-red-50 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="menu-title">
                        Explore Our Menu <span className='text-red-500'>:</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover <span className="font-semibold text-red-600">{filteredFoods.length}</span> delicious dishes
                    </p>
                </div>

                {/* Category Tabs - Modern Tab Design */}
                <div className="mb-8" data-testid="category-filter">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                data-testid={`category-filter-${category.toLowerCase().replace(' ', '-')}`}
                                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters Bar - Streamlined */}
                <div className="mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 border border-gray-100">
                        {/* Veg/Non-veg Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 mr-2">Type:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setVegFilter('all')}
                                    data-testid="filter-all"
                                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        vegFilter === 'all'
                                            ? 'bg-linear-to-r from-gray-700 to-gray-800 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setVegFilter('veg')}
                                    data-testid="filter-veg"
                                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                                        vegFilter === 'veg'
                                            ? 'bg-linear-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                                    }`}
                                >
                                    <div className={`w-3 h-3 border-2 rounded-sm flex items-center justify-center ${
                                        vegFilter === 'veg' ? 'border-white' : 'border-green-600'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            vegFilter === 'veg' ? 'bg-white' : 'bg-green-600'
                                        }`}></div>
                                    </div>
                                    <span>Veg</span>
                                </button>
                                <button
                                    onClick={() => setVegFilter('non-veg')}
                                    data-testid="filter-non-veg"
                                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                                        vegFilter === 'non-veg'
                                            ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                                    }`}
                                >
                                    <div className={`w-3 h-3 border-2 rounded-sm flex items-center justify-center ${
                                        vegFilter === 'non-veg' ? 'border-white' : 'border-red-600'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            vegFilter === 'non-veg' ? 'bg-white' : 'bg-red-600'
                                        }`}></div>
                                    </div>
                                    <span>Non-Veg</span>
                                </button>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Sort:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    data-testid="sort-select"
                                    className="appearance-none px-5 py-2 pr-10 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
                                >
                                    <option value="default">Default</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Food Grid */}
                {filteredFoods.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl" data-testid="no-items-message">
                        <div className="text-8xl mb-6">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No dishes found</h3>
                        <p className="text-gray-500 text-lg">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-testid="food-grid">
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