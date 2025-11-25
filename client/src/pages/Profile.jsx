import { User, Mail, Phone, MapPin, Calendar, Award, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await api.getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const memberSince = user?.createdAt 
        ? formatDate(user.createdAt)
        : 'Recently joined';

    return (
        <div className="min-h-screen bg-red-50 py-4 md:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2" data-testid="profile-title">
                        My Profile <span className='text-red-600'>:</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Manage your account and view your order history</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl md:rounded-lg shadow-md p-4 md:p-6" data-testid="profile-card">
                            {/* Avatar */}
                            <div className="text-center mb-4 md:mb-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-red-500 to-red-600 text-white rounded-full text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
                                    {user?.name
                                        ?.split(' ')
                                        .map((n) => n[0])
                                        .join('') || 'U'}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900" data-testid="user-name">{user?.name || 'User'}</h2>
                                <p className="text-sm sm:text-base text-gray-600">Food Enthusiast</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start space-x-3" data-testid="user-email">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-sm sm:text-base text-gray-900 wrap-break-word">{user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="user-phone">
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-sm sm:text-base text-gray-900">{user?.phone || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="user-address">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-600">Address</p>
                                        <p className="font-medium text-sm sm:text-base text-gray-900">{user?.address || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="member-since">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-600">Member Since</p>
                                        <p className="font-medium text-sm sm:text-base text-gray-900">{memberSince}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-xl md:rounded-lg shadow-md p-4 md:p-6 mt-4 md:mt-6" data-testid="stats-card">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 md:mb-4">Account Stats</h3>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Total Orders</span>
                                    <span className="text-xl sm:text-2xl font-bold text-red-600" data-testid="total-orders">
                                        {orders.length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm sm:text-base text-gray-600">Total Spent</span>
                                    <span className="text-xl sm:text-2xl font-bold text-red-600" data-testid="total-spent">
                                        ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="pt-3 border-t">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />
                                        <span className="text-xs sm:text-sm">Member of Aahare Bangla</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl md:rounded-lg shadow-md p-4 md:p-6" data-testid="recent-orders">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Order History</h3>
                            
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                                    <p className="mt-2 text-sm sm:text-base text-gray-600">Loading orders...</p>
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-gray-600">No orders yet</p>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">Start ordering to see your order history here!</p>
                                </div>
                            ) : (
                                <div className="space-y-3 md:space-y-4">
                                    {orders.slice(0, 5).map((order, index) => (
                                        <div
                                            key={order._id}
                                            className="border rounded-xl md:rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                                            data-testid={`order-${index}`}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                                <div>
                                                    <p className="font-bold text-sm sm:text-base text-gray-900" data-testid={`order-id-${index}`}>
                                                        Order #{order._id.slice(-6).toUpperCase()}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600" data-testid={`order-date-${index}`}>
                                                        {formatDate(order.createdAt)}
                                                    </p>
                                                </div>
                                                <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full w-fit">
                                                    Delivered
                                                </span>
                                            </div>
                                            <div className="text-gray-700 mb-2">
                                                <p className="text-xs sm:text-sm font-medium mb-1">Items:</p>
                                                {order.items.map((item, idx) => (
                                                    <p key={idx} className="text-xs sm:text-sm">
                                                        • {item.food?.name || 'Unknown Item'} x {item.quantity}
                                                    </p>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t">
                                                <span className="text-sm sm:text-base text-gray-600">Total</span>
                                                <span className="text-lg sm:text-xl font-bold text-red-600" data-testid={`order-total-${index}`}>
                                                    ₹{order.total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;