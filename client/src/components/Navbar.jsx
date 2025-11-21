import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalItems } = useCart();
    const location = useLocation();
    const totalItems = getTotalItems();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Services', path: '/services' },
        { name: 'Profile', path: '/profile' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-orange-600">
                            Aahare Bangla
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                data-testid={`nav-link-${link.name.toLowerCase()}`}
                                className={`font-medium transition-colors ${isActive(link.path)
                                        ? 'text-orange-600'
                                        : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Cart and Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/cart"
                            data-testid="cart-button"
                            className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span
                                    data-testid="cart-count"
                                    className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:text-orange-600"
                            data-testid="mobile-menu-button"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
                    <div className="px-4 py-3 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block py-2 font-medium transition-colors ${isActive(link.path)
                                        ? 'text-orange-600'
                                        : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;