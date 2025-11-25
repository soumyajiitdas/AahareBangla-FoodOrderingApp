import { Link } from 'react-router-dom';
import { Clock, Award, Truck, Shield, ChevronRight, Star, Smartphone, ArrowRight, CheckCircle, Users, TrendingUp, Sparkles } from 'lucide-react';

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
            description: 'Free delivery on orders above ₹350',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Safe & Hygienic',
            description: 'Prepared with utmost care and hygiene standards',
        },
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            rating: 5,
            comment: 'The best Bengali food I\'ve had outside of Kolkata! Absolutely authentic flavors and quick delivery.',
            avatar: '👩‍🦱'
        },
        {
            name: 'Rajesh Kumar',
            rating: 5,
            comment: 'Amazing quality and taste! The thali is perfect for lunch. Highly recommend the fish curry!',
            avatar: '👨‍💼'
        },
        {
            name: 'Ananya Das',
            rating: 5,
            comment: 'Love the variety and freshness. The desserts are to die for! Will order again.',
            avatar: '👩‍🎓'
        }
    ];

    const steps = [
        {
            number: '01',
            title: 'Choose Your Dish',
            description: 'Browse our extensive menu and pick your favorites',
            icon: '🍽️'
        },
        {
            number: '02',
            title: 'Place Order',
            description: 'Add items to cart and complete your order',
            icon: '🛒'
        },
        {
            number: '03',
            title: 'Enjoy Your Meal',
            description: 'Get it delivered hot and fresh to your doorstep',
            icon: '🚀'
        }
    ];

    const stats = [
        { icon: <Users className="w-8 h-8" />, value: '1000+', label: 'Happy Customers' },
        { icon: <Award className="w-8 h-8" />, value: '25+', label: 'Dishes Served' },
        { icon: <Star className="w-8 h-8" />, value: '4.5', label: 'Average Rating' },
        { icon: <TrendingUp className="w-8 h-8" />, value: '98%', label: 'Customer Satisfaction' }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section with Image */}
            <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden" data-testid="hero-section">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kfGVufDB8fHx8MTc2MzcwODU0NXww&ixlib=rb-4.1.0&q=85"
                        alt="Delicious Indian Food"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/50"></div>
                    
                    {/* Animated particles/shapes */}
                    <div className="hidden sm:block absolute top-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
                    <div className="hidden sm:block absolute bottom-40 right-40 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-2xl">
                            {/* Special Badge */}
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-white animate-slideIn">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                                <span className="text-xs sm:text-sm font-semibold">Free Delivery on Orders ₹350+</span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 sm:mb-6 text-white animate-fadeIn leading-tight" data-testid="hero-title">
                                Order food online from
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-600 to-orange-500">Aahare Bangla</span>
                            </h1>
                            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-10 text-gray-200 leading-relaxed">
                                Authentic Bengali & Indian cuisine delivered to your doorstep in 30 minutes 🚀
                            </p>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                <Link
                                    to="/menu"
                                    data-testid="order-now-button"
                                    className="inline-flex items-center space-x-2 bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
                                >
                                    <span>Order Now</span>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                                <Link
                                    to="/services"
                                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all"
                                >
                                    <span>Learn More</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-red-500 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section - NEW */}
            <section className="bg-linear-to-r from-red-500 to-red-600 py-8 sm:py-12 -mt-1">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center text-white">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                                    <div className="scale-75 sm:scale-100">{stat.icon}</div>
                                </div>
                                <div className="text-2xl sm:text-4xl font-bold mb-1">{stat.value}</div>
                                <div className="text-red-100 text-xs sm:text-sm font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-12 sm:py-20 bg-red-50" data-testid="categories-section">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                            What's on your mind <span className='text-red-600'>?</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-xl">Browse our popular categories</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                        {[
                            { name: 'Appetizers', emoji: '🍟', color: 'from-yellow-400 to-orange-500' },
                            { name: 'Main Course', emoji: '🍛', color: 'from-red-400 to-pink-500' },
                            { name: 'Desserts', emoji: '🍰', color: 'from-pink-400 to-purple-500' },
                            { name: 'Beverages', emoji: '🥤', color: 'from-blue-400 to-cyan-500' }
                        ].map((category, index) => (
                            <Link
                                key={index}
                                to="/menu"
                                data-testid={`category-${category.name.toLowerCase().replace(' ', '-')}`}
                                className="relative bg-white border-2 border-red-300/30 hover:border-red-500 p-6 sm:p-10 rounded-2xl sm:rounded-3xl text-center font-bold transition-all hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                
                                <div className="relative z-10">
                                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{category.emoji}</div>
                                    <div className="text-sm sm:text-xl text-gray-800 group-hover:text-red-600 transition-colors font-bold">{category.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                            How It Works <span className='text-red-600'>:</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-xl">Three simple steps to delicious food</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connecting Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-33 left-[60%] w-[80%] h-1 bg-linear-to-r from-red-200 to-red-100 z-0"></div>
                                )}
                                
                                <div className="relative bg-linear-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-red-300/30 hover:border-red-500 hover:shadow-2xl transition-all group">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-red-600 to-red-700 text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-xl shadow-lg group-hover:scale-110 transition-transform">
                                        {step.number}
                                    </div>
                                    
                                    <div className="text-center mt-4 sm:mt-6">
                                        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform">{step.icon}</div>
                                        <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">{step.title}</h3>
                                        <p className="text-gray-600 text-sm sm:text-lg">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Food Showcase Section */}
            <section className="py-12 sm:py-20 bg-red-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-red-100 text-red-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 font-semibold text-sm">
                                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Authentic Flavors</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Experience Authentic Bengali Cuisine <span className='text-red-600'>:</span>
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                                From traditional thalis to modern fusion dishes, we bring you the finest flavors of Bengal and India. Every dish is prepared with authentic spices and fresh ingredients.
                            </p>
                            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                                    <span className="font-medium text-sm sm:text-base">Fresh ingredients daily</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                                    <span className="font-medium text-sm sm:text-base">Traditional recipes</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                                    <span className="font-medium text-sm sm:text-base">Expert chefs</span>
                                </div>
                            </div>
                            <Link
                                to="/menu"
                                className="inline-flex items-center space-x-2 bg-linear-to-r from-red-600 to-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:shadow-2xl hover:shadow-red-500/40 transition-all hover:scale-105"
                            >
                                <span>Explore Menu</span>
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            {/* Decorative elements */}
                            <div className="hidden sm:block absolute -top-6 -right-6 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                            <div className="hidden sm:block absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1588644525273-f37b60d78512?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxiZW5nYWxpJTIwZm9vZHxlbnwwfHx8fDE3NjM3MDg1NTB8MA&ixlib=rb-4.1.0&q=85"
                                    alt="Bengali Thali"
                                    className="w-full h-full object-cover"
                                />
                                {/* Rating Badge */}
                                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                                    <span className="font-bold text-gray-900 text-sm sm:text-base">4.9/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-20 bg-white" data-testid="features-section">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16 text-gray-900">
                        Why Choose Us <span className='text-red-600'>?</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative bg-linear-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all text-center group border-2 border-gray-100 hover:border-red-500 hover:-translate-y-2"
                                data-testid={`feature-${index}`}
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-3xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-red-500 to-red-600 text-white rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                                        <div className="scale-75 sm:scale-100">{feature.icon}</div>
                                    </div>
                                    <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 sm:py-20 bg-red-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                            What Our Customers Say <span className='text-red-600'>?</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-xl">Join thousands of satisfied food lovers <span className='text-red-600'>...</span></p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-red-500">
                                {/* Stars */}
                                <div className="flex gap-1 mb-3 sm:mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                
                                {/* Comment */}
                                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg">"{testimonial.comment}"</p>
                                
                                {/* Author */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-500">Verified Customer</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="gradient-red text-white py-12 sm:py-24" data-testid="cta-section">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
                            <span className="font-semibold text-sm sm:text-lg">Order Now & Get 20% Off</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                            Craving something delicious?
                        </h2>
                        <p className="text-base sm:text-2xl mb-8 sm:mb-10 text-red-50 leading-relaxed">
                            Explore our menu and get your favorite dishes delivered in minutes
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                            <Link
                                to="/menu"
                                data-testid="cta-button"
                                className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-3 sm:px-12 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
                            >
                                <span>View Full Menu</span>
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                            <Link
                                to="/cart"
                                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 sm:px-12 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl hover:bg-white/20 transition-all"
                            >
                                <span>View Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;