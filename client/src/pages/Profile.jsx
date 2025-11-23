import { User, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';

const Profile = () => {
    // Mock user data
    const user = {
        name: 'Subho Chakraborty',
        email: 'subho.chakraborty@gmail.com',
        phone: '+91-9876543210',
        address: 'Khagra, Berhampore, West Bengal - 742101',
        memberSince: 'October 2025',
        totalOrders: 5,
        favoriteCategory: 'Main Course',
        loyaltyPoints: 200,
    };

    const recentOrders = [
        {
            id: 'ORD-1234',
            date: '2024-08-15',
            items: 'Chicken Wings, Margherita Pizza, Cold Coffee',
            total: 32.97,
            status: 'Delivered',
        },
        {
            id: 'ORD-1233',
            date: '2024-08-12',
            items: 'Paneer Tikka Masala, Garlic Bread, Mango Lassi',
            total: 23.97,
            status: 'Delivered',
        },
        {
            id: 'ORD-1232',
            date: '2024-08-08',
            items: 'Fish and Chips, Tiramisu, Green Tea',
            total: 27.97,
            status: 'Delivered',
        },
    ];

    return (
        <div className="min-h-screen bg-red-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2" data-testid="profile-title">
                        My Profile <span className='text-red-600'>:</span>
                    </h1>
                    <p className="text-xl text-gray-600">Manage your account and view your order history</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6" data-testid="profile-card">
                            {/* Avatar */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-orange-400 to-red-500 text-white rounded-full text-3xl font-bold mb-4">
                                    {user.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900" data-testid="user-name">{user.name}</h2>
                                <p className="text-gray-600">Food Enthusiast</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3" data-testid="user-email">
                                    <Mail className="w-5 h-5 text-orange-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-900">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="user-phone">
                                    <Phone className="w-5 h-5 text-orange-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-900">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="user-address">
                                    <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-medium text-gray-900">{user.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3" data-testid="member-since">
                                    <Calendar className="w-5 h-5 text-orange-600 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-600">Member Since</p>
                                        <p className="font-medium text-gray-900">{user.memberSince}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6" data-testid="stats-card">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Orders</span>
                                    <span className="text-2xl font-bold text-orange-600" data-testid="total-orders">
                                        {user.totalOrders}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Loyalty Points</span>
                                    <span className="text-2xl font-bold text-orange-600" data-testid="loyalty-points">
                                        {user.loyaltyPoints}
                                    </span>
                                </div>
                                <div className="pt-3 border-t">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Award className="w-5 h-5 text-orange-600" />
                                        <span>Favorite: {user.favoriteCategory}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6" data-testid="recent-orders">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h3>
                            <div className="space-y-4">
                                {recentOrders.map((order, index) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                        data-testid={`order-${index}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-gray-900" data-testid={`order-id-${index}`}>{order.id}</p>
                                                <p className="text-sm text-gray-600" data-testid={`order-date-${index}`}>{order.date}</p>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{order.items}</p>
                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <span className="text-gray-600">Total</span>
                                            <span className="text-xl font-bold text-orange-600" data-testid={`order-total-${index}`}>
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* View All Button */}
                            <div className="text-center mt-6">
                                <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                                    View All Orders →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;