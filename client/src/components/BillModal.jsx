import { X, Download } from 'lucide-react';
import { generateInvoicePDF } from '../utils/pdfGenerator';

const BillModal = ({ isOpen, onClose, order, orderData }) => {
    if (!isOpen) return null;

    const subtotal = order.getTotalPrice();
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

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
                    <div className="text-center mb-8 border-b pb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="invoice-title">INVOICE</h2>
                        <h3 className="text-xl font-semibold text-orange-600">Aahare Bangla Restaurant</h3>
                        <p className="text-gray-600 text-sm">123 Food Street, Kolkata, India</p>
                        <p className="text-gray-600 text-sm">Phone: +91-1234567890</p>
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
                                        <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                                        <td className="py-3 text-right font-semibold" data-testid={`bill-item-total-${index}`}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="border-t-2 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span data-testid="bill-subtotal">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Tax (5%):</span>
                            <span data-testid="bill-tax">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
                            <span>Total:</span>
                            <span data-testid="bill-total">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t text-gray-600 italic">
                        <p>Thank you for your order!</p>
                        <p className="text-sm">We hope to serve you again soon.</p>
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