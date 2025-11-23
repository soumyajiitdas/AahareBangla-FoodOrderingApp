import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, totalAmount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-testid="confirmation-modal">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    data-testid="close-modal-button"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                        <svg
                            className="h-6 w-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid="confirmation-title">
                        Confirm Your Order
                    </h3>
                    <p className="text-gray-600 mb-6">
                        You are about to place an order worth
                    </p>
                    <p className="text-3xl font-bold text-orange-600 mb-6" data-testid="confirmation-total">
                        ₹{totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        This action will process your order and generate an invoice.
                    </p>

                    <div className="flex space-x-4">
                        <button
                            onClick={onClose}
                            data-testid="cancel-order-button"
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            data-testid="confirm-order-button"
                            className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;