import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    // Load cart from backend when user is authenticated
    useEffect(() => {
        const loadCart = async () => {
            if (isAuthenticated) {
                try {
                    setIsLoading(true);
                    const cartItems = await api.getCart();
                    // Transform backend cart items to match frontend structure
                    const transformedCart = cartItems.map(item => ({
                        _id: item.food._id,
                        name: item.food.name,
                        price: item.food.price,
                        category: item.food.category,
                        description: item.food.description,
                        image: item.food.image,
                        isVeg: item.food.isVeg,
                        quantity: item.quantity,
                        cartItemId: item._id // Store the cart item ID for updates/deletes
                    }));
                    setCart(transformedCart);
                } catch (error) {
                    console.error('Failed to load cart:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Clear cart when not authenticated
                setCart([]);
            }
        };

        loadCart();
    }, [isAuthenticated]);

    // Add item to cart
    const addToCart = async (food) => {
        if (!isAuthenticated) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            // Add to backend first
            await api.addToCart(food._id, 1);
            
            // Update local state
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item._id === food._id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item._id === food._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevCart, { ...food, quantity: 1 }];
            });
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    // Remove item from cart
    const removeFromCart = async (foodId) => {
        const cartItem = cart.find(item => item._id === foodId);
        if (!cartItem || !isAuthenticated) return;

        try {
            // Remove from backend
            if (cartItem.cartItemId) {
                await api.removeFromCart(cartItem.cartItemId);
            }
            
            // Update local state
            setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            alert('Failed to remove item from cart. Please try again.');
        }
    };

    // Update quantity
    const updateQuantity = async (foodId, quantity) => {
        if (!isAuthenticated) return;

        if (quantity < 1) {
            removeFromCart(foodId);
            return;
        }

        const cartItem = cart.find(item => item._id === foodId);
        if (!cartItem) return;

        try {
            // Update on backend
            if (cartItem.cartItemId) {
                await api.updateCartItem(cartItem.cartItemId, quantity);
            }
            
            // Update local state
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item._id === foodId ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error('Failed to update quantity:', error);
            alert('Failed to update quantity. Please try again.');
        }
    };

    // Clear cart
    const clearCart = async () => {
        if (!isAuthenticated) {
            setCart([]);
            return;
        }

        try {
            await api.clearCart();
            setCart([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            // Still clear local state even if backend fails
            setCart([]);
        }
    };

    // Get total items count
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Get total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isLoading,
        setIsLoading,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};