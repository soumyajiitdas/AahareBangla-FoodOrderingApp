import { X, Download } from 'lucide-react';
import { generateInvoicePDF } from '../utils/pdfGenerator';

const BillModal = ({ isOpen, onClose, order, orderData }) => {
    if (!isOpen) return null;

    const subtotal = order.getTotalPrice();
    const tax = subtotal * 0.05; // 5% tax
    const deliveryFee = subtotal > 350 ? 0 : 50;
    const total = subtotal + tax + deliveryFee;

    const handleDownloadPDF = () => {
        generateInvoicePDF(order, orderData);
        // Wait a bit before closing and clearing cart
        setTimeout(() => {
            order.clearCart();
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-testid="bill-modal">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                    data-testid="close-bill-button"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8" id="invoice">
                    {/* Header */}
                    <div className="text-center mb-8 border-b-2 border-orange-200 pb-6 bg-linear-to-r from-orange-50 to-red-50 -m-8 p-8 rounded-t-lg">
                        <div className="flex justify-center mb-4">
                            <img src="/logo.png" alt="Aahare Bangla Logo" className="h-16 w-16 object-contain" />
                        </div>
                        <h2 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2" data-testid="invoice-title">TAX INVOICE</h2>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Aahare Bangla Restaurant</h3>
                        <p className="text-gray-700 text-sm font-medium">Banjetia, Berhampore, West Bengal - 742102</p>
                        <p className="text-gray-600 text-sm">Phone: +91-1234567890 | Email: info@aaharebangla.com</p>
                    </div>

                    {/* Order Details */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Order ID</p>
                            <p className="font-semibold" data-testid="order-id">{orderData.orderId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-semibold" data-testid="order-date">{orderData.date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="font-semibold" data-testid="order-time">{orderData.time}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <table className="w-full">
                            <thead className="border-b-2 border-gray-300">
                                <tr>
                                    <th className="text-left py-2 font-semibold">Item</th>
                                    <th className="text-center py-2 font-semibold">Qty</th>
                                    <th className="text-right py-2 font-semibold">Price</th>
                                    <th className="text-right py-2 font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cart.map((item, index) => (
                                    <tr key={index} className="border-b" data-testid={`bill-item-${index}`}>
                                        <td className="py-3">{item.name}</td>
                                        <td className="py-3 text-center" data-testid={`bill-item-quantity-${index}`}>{item.quantity}</td>
                                        <td className="py-3 text-right">₹{item.price.toFixed(2)}</td>
                                        <td className="py-3 text-right font-semibold" data-testid={`bill-item-total-${index}`}>
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span data-testid="bill-subtotal">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Tax (5%):</span>
                            <span data-testid="bill-tax">₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Delivery Charge:</span>
                            <span data-testid="bill-delivery" className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
                                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                            </span>
                        </div>
                        {subtotal > 350 && (
                            <p className="text-xs text-green-600 font-medium">🎉 Free delivery unlocked!</p>
                        )}
                        <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-orange-200 pt-3 mt-2 bg-orange-50 -mx-4 px-4 py-3 rounded-lg">
                            <span className="text-orange-600">Grand Total:</span>
                            <span data-testid="bill-total" className="text-orange-600">₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t-2 border-orange-200 text-gray-600 bg-linear-to-r from-orange-50 to-red-50 -mx-8 -mb-8 px-8 py-6 rounded-b-lg">
                        <p className="text-lg font-semibold text-gray-800 mb-1">Thank you for choosing Aahare Bangla! 🙏</p>
                        <p className="text-sm italic">We hope to serve you again soon with authentic Bengali flavors.</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="p-6 bg-gray-50 border-t flex justify-center">
                    <button
                        onClick={handleDownloadPDF}
                        data-testid="download-pdf-button"
                        className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
                    >
                        <Download className="w-5 h-5" />
                        <span>Download as PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillModal;