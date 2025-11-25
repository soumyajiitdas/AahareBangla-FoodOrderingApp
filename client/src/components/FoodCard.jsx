import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const FoodCard = ({ food }) => {
    const { addToCart, cart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const cartItem = cart.find((item) => item._id === food._id);

    const handleAddToCart = () => {
        addToCart(food);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 800);
    };

    return (
        <div
            className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-300 group relative"
            data-testid={`food-card-${food._id}`}
        >
            {/* Image Container */}
            <div className="relative h-44 sm:h-48 md:h-56 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Veg/Non-veg Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    {food.isVeg ? (
                        <div className="bg-white/95 backdrop-blur-sm p-1 sm:p-1.5 rounded-md sm:rounded-lg shadow-lg border-2 border-green-600">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-600 rounded-full"></div>
                        </div>
                    ) : (
                        <div className="bg-white/95 backdrop-blur-sm p-1 sm:p-1.5 rounded-md sm:rounded-lg shadow-lg border-2 border-red-600">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-600 rounded-full"></div>
                        </div>
                    )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                        {food.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6">
                {/* Food Name */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1" data-testid={`food-name-${food._id}`}>
                    {food.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-800 transition-colors duration-300 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{food.description}</p>

                {/* Divider */}
                <div className="h-px bg-red-200 group-hover:bg-red-300 transition-colors duration-300 mb-3 sm:mb-4"></div>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                        <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-red-600 to-red-700 bg-clip-text text-transparent" data-testid={`food-price-${food._id}`}>
                            ₹{food.price.toFixed(2)}
                        </span>
                        {cartItem && (
                            <span className="text-xs text-green-600 font-semibold mt-1 sm:mt-1.5 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full inline-block w-fit">
                                ✓ {cartItem.quantity} in cart
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        data-testid={`add-to-cart-${food._id}`}
                        className={`${
                            isAdded 
                                ? 'bg-linear-to-r from-green-500 to-green-600 scale-95' 
                                : 'bg-linear-to-r from-red-600 to-red-700 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105'
                        } text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-lg text-xs sm:text-sm shrink-0`}
                    >
                        {isAdded ? (
                            <>
                                <span>✓ Added</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                                <span>ADD</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;