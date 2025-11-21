import { Link } from 'react-router-dom';
import { Clock, Award, Truck, Shield } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'Fast Delivery',
            description: 'Get your food delivered hot and fresh within 30 minutes',
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Quality Food',
            description: 'Authentic Bengali and Indian cuisine made with love',
        },
        {
            icon: <Truck className="w-8 h-8" />,
            title: 'Free Delivery',
            description: 'Free delivery on orders above $20',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Safe & Hygienic',
            description: 'Prepared with utmost care and hygiene standards',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20" data-testid="hero-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn" data-testid="hero-title">
                            Delicious Food,
                            <br />
                            Delivered to Your Door
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-orange-50">
                            Experience authentic Bengali & Indian cuisine from the comfort of your home
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/menu"
                                data-testid="order-now-button"
                                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
                            >
                                Order Now
                            </Link>
                            <Link
                                to="/services"
                                data-testid="view-services-button"
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
                            >
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50" data-testid="features-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
                                data-testid={`feature-${index}`}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-16" data-testid="categories-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                        Explore Our Menu
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Appetizers', 'Main Course', 'Desserts', 'Beverages'].map((category, index) => (
                            <Link
                                key={index}
                                to="/menu"
                                data-testid={`category-${category.toLowerCase().replace(' ', '-')}`}
                                className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-8 rounded-lg text-center font-bold text-xl hover:scale-105 transition-transform shadow-lg"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-orange-600 text-white py-16" data-testid="cta-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Hungry? Order Now!
                    </h2>
                    <p className="text-xl mb-8 text-orange-50">
                        Browse our menu and get your favorite dishes delivered in minutes
                    </p>
                    <Link
                        to="/menu"
                        data-testid="cta-button"
                        className="inline-block bg-white text-orange-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
                    >
                        View Full Menu
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;