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
        setTimeout(() => setIsAdded(false), 1000);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            data-testid={`food-card-${food._id}`}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {food.isVeg && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        VEG
                    </span>
                )}
                {!food.isVeg && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        NON-VEG
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1" data-testid={`food-name-${food._id}`}>
                    {food.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{food.description}</p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600" data-testid={`food-price-${food._id}`}>
                        ${food.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        data-testid={`add-to-cart-${food._id}`}
                        className={`${isAdded ? 'bg-green-500' : 'bg-orange-600 hover:bg-orange-700'
                            } text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2`}
                    >
                        {isAdded ? (
                            <>
                                <span>Added!</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5" />
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Show quantity if in cart */}
                {cartItem && (
                    <div className="mt-3 text-sm text-orange-600 font-medium">
                        {cartItem.quantity} in cart
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodCard;