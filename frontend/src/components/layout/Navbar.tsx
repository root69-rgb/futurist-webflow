import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check theme for logo
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkTheme();

    // Set up observers
    window.addEventListener('scroll', handleScroll);
    
    // Create a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close menu when clicking a link or when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close mobile menu when location changes
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' },
  ];

  // Function to check if a nav link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-tech-dark/80 backdrop-blur-md shadow-md py-2 lg:py-3'
          : 'bg-white dark:bg-tech-dark py-3 lg:py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center max-w-full overflow-hidden">
        <Link to="/" className="flex items-center shrink-0">
          {isDark ? (
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple">
              ViewTech
            </span>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-tech-dark">
              ViewTech
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
          <ul className="flex space-x-2 lg:space-x-6">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.path}
                  className="font-medium text-tech-dark dark:text-white hover:text-primary transition-colors relative group px-1 sm:px-2"
                >
                  <span className={isActive(link.path) ? "text-primary" : ""}>
                    {link.title}
                  </span>
                  <span className={`absolute left-0 right-0 bottom-[-4px] h-[2px] bg-primary transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-1.5"
              size={isMobile ? "sm" : "default"}
              asChild
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-tech-dark dark:text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-tech-dark shadow-lg animate-fade-in overflow-hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className={`flex items-center py-2 font-medium hover:text-primary relative ${
                      isActive(link.path) ? "text-primary" : "text-tech-dark dark:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                    <span className={`absolute left-0 bottom-[-2px] h-[2px] bg-primary transition-all duration-300 ${
                      isActive(link.path) ? 'w-12' : 'w-0'
                    }`}></span>
                  </Link>
                </li>
              ))}
              <li>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Live Chat Dialog */}
      <Dialog open={isLiveChatOpen} onOpenChange={setIsLiveChatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Live Chat Support</DialogTitle>
            <DialogDescription>
              Connect with our support team. We typically respond within minutes during business hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg max-h-[300px] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 text-primary p-2 rounded-lg">
                    <MessageCircle size={18} />
                  </div>
                  <div className="bg-muted-foreground/10 p-3 rounded-lg text-sm max-w-[80%]">
                    <p><strong>Support Agent:</strong> Hello! Welcome to ViewTech support. How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  className="w-full"
                  placeholder="Type your message here..."
                  disabled
                />
              </div>
              <Button className="shrink-0" size="sm" disabled>Send</Button>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              This is a demonstration. In a real implementation, this would connect to a live chat service.
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setIsLiveChatOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsLiveChatOpen(false)}>
              Start New Conversation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
