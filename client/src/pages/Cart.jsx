import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import BillModal from '../components/BillModal';
import { api } from '../utils/api';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showBill, setShowBill] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = getTotalPrice();
    const tax = subtotal * 0.05;        // 5% tax
    const deliveryFee = subtotal > 350 ? 0 : 50;
    const total = subtotal + tax + deliveryFee;

    const handleOrderNow = () => {
        if (cart.length === 0) return;
        setShowConfirmation(true);
    };

    const handleConfirmOrder = async () => {
        setIsProcessing(true);
        try {
            // Generate order data
            const now = new Date();
            const order = {
                orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
                date: now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                time: now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };

            setOrderData(order);
            setShowConfirmation(false);
            setShowBill(true);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12" data-testid="empty-cart">
                <div className="text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                    <Link
                        to="/menu"
                        data-testid="browse-menu-button"
                        className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="cart-title">
                    Your Cart <span className="text-orange-600">:</span>
                </h1>
                <p className="text-gray-600 text-md mb-6">Hurry! <span className='text-red-600'>{cart.length}</span> item(s) added to your cart — finish your order and enjoy them fresh & fast. 🚀</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
                        {cart.map((item, index) => (
                            <div
                                key={item._id}
                                className="bg-red-50 border border-red-400/30 rounded-2xl shadow-md p-4 flex items-center space-x-4"
                                data-testid={`cart-item-${index}`}
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900" data-testid={`cart-item-name-${index}`}>
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-lg font-bold text-orange-600 mt-1" data-testid={`cart-item-price-${index}`}>
                                        ₹{item.price.toFixed(2)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        data-testid={`decrease-quantity-${index}`}
                                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-lg font-medium w-8 text-center" data-testid={`cart-item-quantity-${index}`}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        data-testid={`increase-quantity-${index}`}
                                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    data-testid={`remove-item-${index}`}
                                    className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-red-400/30 rounded-2xl shadow-md p-6 sticky top-20" data-testid="order-summary">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary <span className='text-orange-600'>:</span></h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal:</span>
                                    <span data-testid="cart-subtotal">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax (5%):</span>
                                    <span data-testid="cart-tax">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Fee:</span>
                                    <span data-testid="cart-delivery">
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                                    </span>
                                </div>
                                {subtotal > 350 && (
                                    <p className="text-sm text-green-600 font-medium">🎉 Free delivery unlocked!</p>
                                )}
                                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total <span className='text-orange-600'>:</span></span>
                                    <span data-testid="cart-total">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleOrderNow}
                                disabled={isProcessing}
                                data-testid="order-now-button"
                                className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Order Now'}
                            </button>

                            <Link
                                to="/menu"
                                data-testid="continue-shopping-button"
                                className="block text-center text-orange-600 font-medium mt-4 hover:text-orange-700 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmOrder}
                totalAmount={total}
            />

            <BillModal
                isOpen={showBill}
                onClose={() => setShowBill(false)}
                order={{ cart, getTotalPrice, clearCart }}
                orderData={orderData}
            />
        </div>
    );
};

export default Cart;