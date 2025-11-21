import { Link } from 'react-router-dom';
import { Clock, Award, Truck, Shield, ChevronRight } from 'lucide-react';

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
            {/* Hero Section with Image */}
            <section className="relative h-[600px] md:h-[700px] overflow-hidden" data-testid="hero-section">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kfGVufDB8fHx8MTc2MzcwODU0NXww&ixlib=rb-4.1.0&q=85"
                        alt="Delicious Indian Food"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fadeIn" data-testid="hero-title">
                                Order food online from
                                <br />
                                <span className="text-red-500">Aahare Bangla</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-10 text-gray-200">
                                Authentic Bengali & Indian cuisine delivered to your doorstep in 30 minutes
                            </p>
                            <Link
                                to="/menu"
                                data-testid="order-now-button"
                                className="inline-flex items-center space-x-2 bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-2xl hover:scale-105"
                            >
                                <span>Order Now</span>
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-16 bg-white" data-testid="categories-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            What's on your mind?
                        </h2>
                        <p className="text-gray-600 text-lg">Browse our popular categories</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { name: 'Appetizers', emoji: '🍟' },
                            { name: 'Main Course', emoji: '🍛' },
                            { name: 'Desserts', emoji: '🍰' },
                            { name: 'Beverages', emoji: '🥤' }
                        ].map((category, index) => (
                            <Link
                                key={index}
                                to="/menu"
                                data-testid={`category-${category.name.toLowerCase().replace(' ', '-')}`}
                                className="bg-white border-2 border-gray-200 hover:border-red-600 p-8 rounded-2xl text-center font-bold transition-all hover:shadow-lg card-hover group"
                            >
                                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{category.emoji}</div>
                                <div className="text-lg text-gray-800 group-hover:text-red-600 transition-colors">{category.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Food Showcase Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Experience Authentic Bengali Cuisine
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                From traditional thalis to modern fusion dishes, we bring you the finest flavors of Bengal and India. Every dish is prepared with authentic spices and fresh ingredients.
                            </p>
                            <Link
                                to="/menu"
                                className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                            >
                                <span>Explore Menu</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1588644525273-f37b60d78512?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxiZW5nYWxpJTIwZm9vZHxlbnwwfHx8fDE3NjM3MDg1NTB8MA&ixlib=rb-4.1.0&q=85"
                                alt="Bengali Thali"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white" data-testid="features-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center card-hover border border-gray-100"
                                data-testid={`feature-${index}`}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="gradient-red text-white py-20" data-testid="cta-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Craving something delicious?
                        </h2>
                        <p className="text-xl mb-8 text-red-50">
                            Explore our menu and get your favorite dishes delivered in minutes
                        </p>
                        <Link
                            to="/menu"
                            data-testid="cta-button"
                            className="inline-flex items-center space-x-2 bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-xl hover:scale-105"
                        >
                            <span>View Full Menu</span>
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;