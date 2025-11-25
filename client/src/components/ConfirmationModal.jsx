import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, totalAmount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-linear-to-br from-red-50 via-red-50 to-red-100 bg-opacity-50 flex items-center justify-center z-150 p-3 sm:p-4" data-testid="confirmation-modal">
            <div className="bg-white rounded-xl sm:rounded-lg border border-red-500 shadow-xl max-w-md w-full p-5 sm:p-6 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
                    data-testid="close-modal-button"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 mb-3 sm:mb-4">
                        <svg
                            className="h-5 w-5 sm:h-6 sm:w-6 text-red-600"
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

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" data-testid="confirmation-title">
                        Confirm Your Order
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        You are about to place an order worth
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 sm:mb-6" data-testid="confirmation-total">
                        ₹{totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 px-2">
                        This action will process your order and generate an invoice.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={onClose}
                            data-testid="cancel-order-button"
                            className="flex-1 bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            data-testid="confirm-order-button"
                            className="flex-1 bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm sm:text-base"
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