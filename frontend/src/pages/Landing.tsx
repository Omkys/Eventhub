import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, ArrowRight, CheckCircle, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Landing: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const stats = [
    { number: '500+', label: 'Events Hosted' },
    { number: '10K+', label: 'Students Connected' },
    { number: '50+', label: 'Departments' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];
  
  const features = [
    {
      icon: Calendar,
      title: 'Smart Event Discovery',
      description: 'AI-powered recommendations based on your interests and academic profile',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'One-Click Registration',
      description: 'Seamless registration process with instant confirmations and reminders',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Star,
      title: 'Advanced Analytics',
      description: 'Real-time insights and feedback to optimize your event experience',
      color: 'from-orange-500 to-red-500'
    }
  ];
  
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Header */}
        <header className={`py-6 relative z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <div className="relative">
                <Calendar className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EventHub</span>
            </div>
            <div className="space-x-4">
              <Link to="/login" className="btn-secondary hover:scale-105 transition-transform duration-200">
                Login
              </Link>
              <Link to="/register" className="btn-primary hover:scale-105 transition-transform duration-200 animate-pulse-glow">
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className={`py-20 text-center relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Manage College Events
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Effortlessly
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, register, and manage college events all in one place. 
            Connect with your campus community and never miss an important event again.
          </p>
          
          {/* Dynamic Stats */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-500 ${
                    index === currentStat ? 'scale-110 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-x-4">
            <Link 
              to="/register" 
              className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 group"
            >
              Join Now 
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className={`py-20 relative z-10 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of campus event management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" style={{background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}></div>
                  
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className={`py-16 text-center relative z-10 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Leading Institutions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {['Secure', 'Fast', 'Reliable', 'Support'].map((item, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`py-20 text-center relative z-10 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 max-w-4xl mx-auto text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Campus Experience?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of students already using EventHub</p>
              <Link 
                to="/register" 
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-8 w-8 text-blue-400" />
                  <span className="text-2xl font-bold">EventHub</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Connecting students with campus events. Discover, register, and manage college events all in one place.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Get Started</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    support@eventhub.edu
                  </li>
                  <li className="flex items-center text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    +1 (555) 123-4567
                  </li>
                  <li className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    Campus Center, Room 101
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 EventHub. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;