import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {/* About */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4">🧑🏻‍🍳 Aahare Bangla</h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            Authentic Bengali and Indian cuisine delivered to your doorstep. Experience the taste of tradition with every bite.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                            <li><a href="/" className="hover:text-red-500 transition-colors">Home</a></li>
                            <li><a href="/menu" className="hover:text-red-500 transition-colors">Menu</a></li>
                            <li><a href="/services" className="hover:text-red-500 transition-colors">Services</a></li>
                            <li><a href="/profile" className="hover:text-red-500 transition-colors">Profile</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h4>
                        <ul className="space-y-2 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
                            <li className="flex items-center space-x-2">
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                <span>+91-1234567890</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                <span className="break-all">support@aaharebangla.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 shrink-0" />
                                <span>Banjetia, Berhampore, West Bengal - 742102</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h4>
                        <div className="flex space-x-3 sm:space-x-4">
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Facebook">
                                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        </div>
                        <div className="mt-4 sm:mt-6">
                            <p className="text-gray-400 text-xs sm:text-sm">Opening Hours:</p>
                            <p className="text-white font-medium text-xs sm:text-base">Mon - Sun: 10 AM - 10 PM</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-gray-400 text-xs sm:text-sm">
                    <p>&copy; {new Date().getFullYear()} Aahare Bangla. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;