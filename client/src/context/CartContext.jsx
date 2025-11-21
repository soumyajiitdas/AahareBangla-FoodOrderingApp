import { createContext, useContext, useState, useEffect } from 'react';

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

    // Add item to cart
    const addToCart = (food) => {
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
    };

    // Remove item from cart
    const removeFromCart = (foodId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
    };

    // Update quantity
    const updateQuantity = (foodId, quantity) => {
        if (quantity < 1) {
            removeFromCart(foodId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === foodId ? { ...item, quantity } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
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