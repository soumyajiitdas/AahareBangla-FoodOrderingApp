import { Truck, Users, Calendar, Phone, Clock, MapPin } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Truck className="w-12 h-12" />,
            title: 'Home Delivery',
            description:
                'Get your favorite dishes delivered right to your doorstep. Fast, reliable, and contactless delivery available.',
            features: [
                'Delivery within 30 minutes',
                'Real-time order tracking',
                'Contactless delivery option',
                'Free delivery on orders above $20',
            ],
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: 'Party Orders',
            description:
                'Planning a party? Let us take care of the food! We offer special party packages for all occasions.',
            features: [
                'Customizable menu options',
                'Bulk order discounts',
                'Dedicated support for large orders',
                'Flexible delivery timing',
            ],
        },
        {
            icon: <Calendar className="w-12 h-12" />,
            title: 'Special Events',
            description:
                'Make your special events memorable with our catering services. Perfect for weddings, birthdays, and corporate events.',
            features: [
                'Custom event menus',
                'Professional catering staff',
                'Complete setup and cleanup',
                'Vegetarian and non-vegetarian options',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16" data-testid="services-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="services-title">
                        Our Services
                    </h1>
                    <p className="text-xl text-orange-50">
                        Discover how we can serve you better
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                data-testid={`service-${index}`}
                            >
                                <div className="md:flex">
                                    {/* Icon Section */}
                                    <div className="md:w-1/3 bg-gradient-to-br from-orange-400 to-red-500 p-8 flex items-center justify-center">
                                        <div className="text-white">{service.icon}</div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-2/3 p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6">{service.description}</p>

                                        {/* Features */}
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-gray-700">
                                                    <svg
                                                        className="w-5 h-5 text-green-500 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white py-16" data-testid="contact-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                        Get in Touch
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Call Us</h3>
                            <p className="text-gray-600">+91-1234567890</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
                            <p className="text-gray-600">Mon - Sun: 10 AM - 10 PM</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                            <p className="text-gray-600">123 Food Street, Kolkata, India</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;