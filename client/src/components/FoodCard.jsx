import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const FoodCard = ({ food }) => {
    const { addToCart, cart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const cartItem = cart.find((item) => item._id === food._id);

    const handleAddToCart = () => {
        addToCart(food);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
            data-testid={`food-card-${food._id}`}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Veg/Non-veg Badge */}
                <div className="absolute top-3 left-3">
                    {food.isVeg ? (
                        <div className="bg-white p-1 rounded shadow-md border-2 border-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                    ) : (
                        <div className="bg-white p-1 rounded shadow-md border-2 border-red-600">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Food Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid={`food-name-${food._id}`}>
                    {food.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">{food.description}</p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900" data-testid={`food-price-${food._id}`}>
                            ${food.price.toFixed(2)}
                        </span>
                        {cartItem && (
                            <span className="text-xs text-red-600 font-medium mt-1">
                                {cartItem.quantity} in cart
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        data-testid={`add-to-cart-${food._id}`}
                        className={`${isAdded ? 'bg-green-500 scale-95' : 'bg-red-600 hover:bg-red-700 hover:scale-105'
                            } text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-md`}
                    >
                        {isAdded ? (
                            <span className="text-sm">Added!</span>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                <span className="text-sm">ADD</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;