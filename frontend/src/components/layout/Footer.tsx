import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Shield, Cctv, Lock, ScanEye, Eye, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PolicyLinks from '../policy/PolicyLinks';

const Footer = () => {
  return (
    <footer className="bg-tech-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple">
              ViewTech Enterprise
            </h3>
            <p className="text-gray-300 mb-6">
              Securing your world with advanced surveillance and security solutions. We protect what matters most to you with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-tech-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tech-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tech-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-tech-blue transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-tech-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Cctv size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#cctv-setup" className="text-gray-300 hover:text-tech-blue transition-colors">
                  CCTV Camera Setup
                </Link>
              </li>
              <li className="flex items-center">
                <Eye size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#virtual-watchdog" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Virtual Watch Dog
                </Link>
              </li>
              <li className="flex items-center">
                <ScanEye size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#ai-analytics" className="text-gray-300 hover:text-tech-blue transition-colors">
                  EYEQ - AI Video Analytics
                </Link>
              </li>
              <li className="flex items-center">
                <Shield size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#e-surveillance" className="text-gray-300 hover:text-tech-blue transition-colors">
                  E-surveillance Service
                </Link>
              </li>
              <li className="flex items-center">
                <Lock size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#access-control" className="text-gray-300 hover:text-tech-blue transition-colors">
                  Access Control Systems
                </Link>
              </li>
              <li className="flex items-center">
                <Server size={16} className="mr-2 text-tech-blue" />
                <Link to="/services#cctv-doctor" className="text-gray-300 hover:text-tech-blue transition-colors">
                  CCTV Doctor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-tech-blue mt-1" size={18} />
                <p className="text-gray-300">123 Security Avenue, Tech Park, NY 10001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-tech-blue" size={18} />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-tech-blue" size={18} />
                <p className="text-gray-300">info@viewtech.com</p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">Subscribe to our newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
                />
                <Button className="bg-tech-blue hover:bg-tech-blue/90 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ViewTech Enterprise. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <PolicyLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
