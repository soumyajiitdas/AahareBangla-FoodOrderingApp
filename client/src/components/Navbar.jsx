import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Search, ChefHat, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const { getTotalItems } = useCart();
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const totalItems = getTotalItems();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Services', path: '/services' },
    ];

    // Add Profile link only if authenticated
    if (isAuthenticated) {
        navLinks.push({ name: 'Profile', path: '/profile' });
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-xl'
                    : 'bg-white shadow-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative gradient-red p-2.5 rounded-2xl transform group-hover:scale-110 group-hover:-rotate-7 transition-all duration-300 shadow-lg">
                                <ChefHat className="w-6 h-6 text-white group-hover:animate-bounce" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black bg-linear-to-r from-red-600 via-red-700 to-orange-600 bg-clip-text text-transparent">
                                Aahare Bangla
                            </span>
                            <span className="text-xs text-gray-500 font-medium -mt-1">Authentic Cuisine <span className='text-red-500'>~</span></span>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    {location.pathname === '/menu' && (
                        <div className="hidden md:flex flex-1 max-w-md mx-3">
                            <div className="relative w-full group">
                                <div className="absolute inset-0 bg-linear-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search for dishes, cuisine..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        data-testid="search-input"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                if (onSearch) onSearch('');
                                            }}
                                            className="absolute right-4 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                data-testid={`nav-link-${link.name.toLowerCase()}`}
                                className={`relative px-5 py-2.5 font-semibold rounded-xl transition-all duration-300 ${isActive(link.path)
                                        ? 'text-white gradient-red shadow-lg shadow-red-500/40 hover:-rotate-7'
                                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/40 hover:-rotate-7'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Auth Buttons */}
                        {location.pathname !== '/menu' && (
                            isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    data-testid="logout-button"
                                    className="flex items-center space-x-2 p-3 text-red-600 bg-gray-100 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:-rotate-7"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    data-testid="login-button"
                                    className="flex items-center space-x-2 px-5 py-2.5 font-semibold rounded-xl text-white gradient-red shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:-rotate-7 transition-all duration-300 "
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Desktop Cart - Hidden on mobile */}
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/cart"
                            data-testid="cart-button"
                            className="relative group"
                        >
                            <div className="relative p-3 text-red-500 hover:text-white bg-red-100 hover:bg-linear-to-r hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:scale-110">
                                <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
                                {totalItems > 0 && (
                                    <>
                                        {/* Pulsing Background */}
                                        <span className="absolute -top-1 -right-1 bg-red-600 rounded-full h-6 w-6 animate-ping opacity-75"></span>
                                        {/* Badge */}
                                        <span
                                            data-testid="cart-count"
                                            className="absolute -top-1 -right-1 bg-linear-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-lg"
                                        >
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    </>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Auth Icon Only */}
                    <div className="md:hidden flex items-center">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                data-testid="mobile-logout-button"
                                className="p-3 text-red-600 bg-gray-100 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-lg"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                data-testid="mobile-login-button"
                                className="p-3 text-white gradient-red rounded-xl shadow-lg transition-all duration-300"
                            >
                                <LogIn className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                {location.pathname === '/menu' && (
                    <div className="md:hidden pb-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for dishes..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-700"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        if (onSearch) onSearch('');
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;