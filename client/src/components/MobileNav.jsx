import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Wrench, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const MobileNav = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    const isActive = (path) => location.pathname === path;

    // Base nav items
    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
        { name: 'Services', path: '/services', icon: Wrench },
    ];

    // Add Profile if authenticated
    if (isAuthenticated) {
        navItems.push({ name: 'Profile', path: '/profile', icon: User });
    }

    // Add Cart at the end
    navItems.push({ name: 'Cart', path: '/cart', icon: ShoppingCart });

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    const isCart = item.name === 'Cart';

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                                active
                                    ? 'text-red-600'
                                    : 'text-gray-600 hover:text-red-500'
                            }`}
                        >
                            <div className="relative">
                                <Icon 
                                    className={`w-6 h-6 transition-transform duration-300 ${
                                        active ? 'scale-110' : ''
                                    }`} 
                                    strokeWidth={active ? 2.5 : 2}
                                />
                                {/* Cart Badge */}
                                {isCart && totalItems > 0 && (
                                    <span
                                        data-testid="mobile-cart-count"
                                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white"
                                    >
                                        {totalItems > 9 ? '9+' : totalItems}
                                    </span>
                                )}
                            </div>
                            <span 
                                className={`text-xs font-semibold mt-1 ${
                                    active ? 'text-red-600' : 'text-gray-600'
                                }`}
                            >
                                {item.name}
                            </span>
                            {/* Active Indicator */}
                            {active && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-600 rounded-b-full"></div>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileNav;