import { X, Download } from 'lucide-react';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import logo from '/assets/logo.png';


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
        <div className="fixed inset-0 bg-linear-to-br from-red-50 via-red-50 to-red-100 bg-opacity-50 flex items-center justify-center z-150 p-3 sm:p-4" data-testid="bill-modal">
            <div className="bg-white rounded-lg sm:rounded-lg border border-red-500 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
                    data-testid="close-bill-button"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="p-4 sm:p-6 md:p-8" id="invoice">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8 border-b-2 border-red-200 pb-4 sm:pb-6 bg-linear-to-r from-red-50 to-red-50 -m-4 sm:-m-6 md:-m-8 p-4 sm:p-6 md:p-8 rounded-t-xl sm:rounded-t-lg">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <img src={logo} alt="Aahare Bangla Logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-red-600 to-red-600 bg-clip-text text-transparent mb-2" data-testid="invoice-title">TAX INVOICE</h2>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Aahare Bangla Restaurant</h3>
                        <p className="text-gray-700 text-xs sm:text-sm font-medium px-2">Banjetia, Berhampore, West Bengal - 742102</p>
                        <p className="text-gray-600 text-xs sm:text-sm px-2">Phone: +91-1234567890 | Email: support@aaharebangla.com</p>
                    </div>

                    {/* Order Details */}
                    <div className="mt-0 sm:mt-12 mb-4 sm:mb-6 grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Order ID</p>
                            <p className="font-semibold text-sm sm:text-base" data-testid="order-id">{orderData.orderId}</p>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Time & Date</p>
                            <p className="font-semibold text-sm sm:text-base" data-testid="order-date">{orderData.time}, <span className='block sm:inline'>{orderData.date}.</span></p>
                        </div>
                    </div>

                    {/* Order Items - Responsive table */}
                    <div className="mb-4 sm:mb-6">
                        {/* Desktop table view */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b-2 border-gray-300">
                                    <tr>
                                        <th className="text-left py-2 font-semibold text-sm">Item</th>
                                        <th className="text-center py-2 font-semibold text-sm">Qty</th>
                                        <th className="text-right py-2 font-semibold text-sm">Price</th>
                                        <th className="text-right py-2 font-semibold text-sm">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cart.map((item, index) => (
                                        <tr key={index} className="border-b" data-testid={`bill-item-${index}`}>
                                            <td className="py-3 text-sm">{item.name}</td>
                                            <td className="py-3 text-center text-sm" data-testid={`bill-item-quantity-${index}`}>{item.quantity}</td>
                                            <td className="py-3 text-right text-sm">₹{item.price.toFixed(2)}</td>
                                            <td className="py-3 text-right font-semibold text-sm" data-testid={`bill-item-total-${index}`}>
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Mobile card view */}
                        <div className="sm:hidden space-y-3">
                            {order.cart.map((item, index) => (
                                <div key={index} className="border-b pb-3" data-testid={`bill-item-${index}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-sm flex-1">{item.name}</span>
                                        <span className="text-xs text-gray-600 ml-2">x{item.quantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-600">₹{item.price.toFixed(2)} each</span>
                                        <span className="font-semibold" data-testid={`bill-item-total-${index}`}>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="border-t-2 border-gray-200 pt-3 sm:pt-4 space-y-2">
                        <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                            <span>Subtotal:</span>
                            <span data-testid="bill-subtotal">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                            <span>Tax (5%):</span>
                            <span data-testid="bill-tax">₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                            <span>Delivery Charge:</span>
                            <span data-testid="bill-delivery" className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
                                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                            </span>
                        </div>
                        {subtotal > 350 && (
                            <p className="text-xs text-green-600 font-medium">🎉 Free delivery unlocked!</p>
                        )}
                        <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 border-t-2 border-red-200 pt-2 sm:pt-3 mt-2 bg-red-50 -mx-4 sm:-mx-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                            <span className="text-red-600">Grand Total:</span>
                            <span data-testid="bill-total" className="text-red-600">₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-red-200 text-gray-600 bg-linear-to-r from-red-50 to-red-50 -mx-4 sm:-mx-6 md:-mx-8 -mb-4 sm:-mb-6 md:-mb-8 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-b-xl sm:rounded-b-lg">
                        <p className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Thank you for choosing Aahare Bangla! 🙏</p>
                        <p className="text-xs sm:text-sm italic">We hope to serve you again soon with authentic Bengali flavors.</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t flex justify-center">
                    <button
                        onClick={handleDownloadPDF}
                        data-testid="download-pdf-button"
                        className="bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm sm:text-base"
                    >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Download as PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillModal;