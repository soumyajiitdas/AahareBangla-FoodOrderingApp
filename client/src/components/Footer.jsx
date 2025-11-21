import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold text-red-500 mb-4">Aahare Bangla</h3>
                        <p className="text-gray-400 text-sm">
                            Authentic Bengali and Indian cuisine delivered to your doorstep. Experience the taste of tradition with every bite.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-red-500 transition-colors">Home</a></li>
                            <li><a href="/menu" className="hover:text-red-500 transition-colors">Menu</a></li>
                            <li><a href="/services" className="hover:text-red-500 transition-colors">Services</a></li>
                            <li><a href="/profile" className="hover:text-red-500 transition-colors">Profile</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+91-1234567890</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>info@aaharebangla.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-1" />
                                <span>123 Food Street, Kolkata, West Bengal, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm">Opening Hours:</p>
                            <p className="text-white font-medium">Mon - Sun: 10 AM - 10 PM</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Aahare Bangla. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;