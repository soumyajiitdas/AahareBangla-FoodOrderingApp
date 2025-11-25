import { Truck, Users, Calendar, Phone, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: <Truck className="w-10 h-10 sm:w-12 sm:h-12" />,
            title: 'Home Delivery',
            description:
                'Get your favorite dishes delivered right to your doorstep. Fast, reliable, and contactless delivery available.',
            features: [
                'Delivery within 30 minutes',
                'Real-time order tracking',
                'Contactless delivery option',
                'Free delivery on orders above ₹350',
            ],
            image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnl8ZW58MHx8fHwxNzYzNzA4NTgxfDA&ixlib=rb-4.1.0&q=85',
        },
        {
            icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" />,
            title: 'Party Orders',
            description:
                'Planning a party? Let us take care of the food! We offer special party packages for all occasions.',
            features: [
                'Customizable menu options',
                'Bulk order discounts',
                'Dedicated support for large orders',
                'Flexible delivery timing',
            ],
            image: 'https://images.unsplash.com/photo-1661994215679-cde7c2c5c060?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGNhdGVyaW5nfGVufDB8fHx8MTc2MzcwODU4Nnww&ixlib=rb-4.1.0&q=85',
        },
        {
            icon: <Calendar className="w-10 h-10 sm:w-12 sm:h-12" />,
            title: 'Special Events',
            description:
                'Make your special events memorable with our catering services. Perfect for weddings, birthdays, and corporate events.',
            features: [
                'Custom event menus',
                'Professional catering staff',
                'Complete setup and cleanup',
                'Vegetarian and non-vegetarian options',
            ],
            image: 'https://plus.unsplash.com/premium_photo-1754341267942-72f7f8e9b09f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxldmVudCUyMGNhdGVyaW5nfGVufDB8fHx8MTc2MzcwODU5Mnww&ixlib=rb-4.1.0&q=85',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Image */}
            <section className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden" data-testid="services-header">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1576842546422-60562b9242ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxwYXJ0eSUyMGNhdGVyaW5nfGVufDB8fHx8MTc2MzcwODU4Nnww&ixlib=rb-4.1.0&q=85"
                        alt="Our Services"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-red-900/90 via-red-800/80 to-red-700/70"></div>
                </div>
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-white animate-fadeIn" data-testid="services-title">
                            Our Services
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-50 max-w-3xl mx-auto px-4">
                            From doorstep delivery to grand celebrations, we've got you covered
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 sm:space-y-12 md:space-y-16">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-red-50 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all card-hover"
                                data-testid={`service-${index}`}
                            >
                                <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Image Section */}
                                    <div className="md:w-2/5 relative h-48 sm:h-64 md:h-auto">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                                            <div className="bg-red-600 rounded-full p-3 sm:p-4 inline-block shadow-xl">
                                                {service.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-3/5 p-6 sm:p-8 md:p-10 lg:p-12">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                            {service.title} <span className='text-red-600'>:</span>
                                        </h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">{service.description}</p>

                                        {/* Features */}
                                        <div className="space-y-3 sm:space-y-4">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 shrink-0 mt-0.5" />
                                                    <span className="text-sm sm:text-base md:text-lg text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 sm:mt-8">
                                            <Link
                                                to="/menu"
                                                className="inline-flex items-center space-x-2 bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                                            >
                                                <span>Order Now</span>
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-8 sm:py-12 md:py-16 bg-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Why Choose Our Services <span className='text-red-600'>?</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">We're committed to making every meal memorable</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {[
                            { title: 'Quality Guaranteed', desc: 'Fresh ingredients and authentic recipes', icon: '✨' },
                            { title: 'On-Time Delivery', desc: 'We value your time as much as you do', icon: '⏰' },
                            { title: 'Customer Support', desc: '24/7 support for all your queries', icon: '💬' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-red-400/30 bg-gray-50 hover:scale-105 transition-all duration-200">
                                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{item.icon}</div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-8 sm:py-12 md:py-16 bg-gray-50" data-testid="contact-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-900">
                        Get in Touch <span className='text-red-600'>:</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <div className="bg-red-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-red-400/30 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-200 text-red-600 rounded-full mb-3 sm:mb-4">
                                <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Call Us</h3>
                            <p className="text-base sm:text-lg text-gray-600">+91-1234567890</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">Available 24/7</p>
                        </div>
                        <div className="bg-red-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-red-400/30 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-200 text-red-600 rounded-full mb-3 sm:mb-4">
                                <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Opening Hours</h3>
                            <p className="text-base sm:text-lg text-gray-600">Mon - Sun</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">10 AM - 10 PM</p>
                        </div>
                        <div className="bg-red-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-red-400/30 shadow-sm hover:shadow-md transition-all text-center sm:col-span-2 md:col-span-1">
                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-200 text-red-600 rounded-full mb-3 sm:mb-4">
                                <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Visit Us</h3>
                            <p className="text-base sm:text-lg text-gray-600">Banjetia, Berhampore</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">West Bengal, India</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;