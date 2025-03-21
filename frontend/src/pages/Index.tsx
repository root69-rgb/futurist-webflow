import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Camera, Shield, ScanEye, 
  Network, Lock, Eye, Check, ChevronRight, Cctv, Monitor, Server
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ui/ServiceCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PolicyManager, { PolicyType } from '@/components/policy/PolicyManager';

interface HomePageProps {
  initialPolicy?: PolicyType | null;
  onPolicyClose?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ initialPolicy = null, onPolicyClose = () => {} }) => {
  const services = [
    {
      icon: Cctv,
      title: 'CCTV Camera Setup',
      description: 'Professional installation and configuration of advanced CCTV surveillance systems for homes and businesses.',
      link: '/services#cctv-setup',
    },
    {
      icon: Eye,
      title: 'Virtual Watch Dog',
      description: '24/7 remote monitoring solutions that keep an eye on your property even when you\'re away.',
      link: '/services#virtual-watchdog',
    },
    {
      icon: Monitor,
      title: 'CCTV Doctor',
      description: 'Comprehensive maintenance, repair, and troubleshooting services for all types of surveillance systems.',
      link: '/services#cctv-doctor',
    },
    {
      icon: ScanEye,
      title: 'EYEQ - AI Video Analytics',
      description: 'Advanced AI-powered video analytics that transform surveillance footage into actionable insights.',
      link: '/services#ai-analytics',
    },
    {
      icon: Shield,
      title: 'E-surveillance Service',
      description: 'Integrated electronic surveillance solutions for comprehensive security coverage.',
      link: '/services#e-surveillance',
    },
    {
      icon: Lock,
      title: 'Access Control Systems',
      description: 'Boom barriers, electronic doors, and smart access control for enhanced security and convenience.',
      link: '/services#access-control',
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Operations Manager',
      company: 'SecureStore Retail',
      testimonial: "ViewTech's CCTV installation provided us with complete coverage of our retail space. Their team's expertise and professional approach made the entire process smooth and hassle-free.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Sarah Johnson',
      role: 'Facility Director',
      company: 'Metropolitan Hospital',
      testimonial: "The AI video analytics system from ViewTech has revolutionized our security operations. We can now proactively respond to situations before they escalate. Excellent service and support!",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Property Manager',
      company: 'Horizon Apartments',
      testimonial: "ViewTech's integrated access control system has significantly improved resident security and satisfaction. Their ongoing maintenance support ensures our systems are always functioning optimally.",
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ];

  const stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '500+', label: 'Security Systems Installed' },
    { value: '200+', label: 'Satisfied Clients' },
    { value: '99%', label: 'System Reliability' },
  ];

  return (
    <>
      <Navbar />
      <PolicyManager open={initialPolicy} onClose={onPolicyClose} initialPolicy={initialPolicy} />
      <main>
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden bg-gradient-to-br from-tech-dark via-tech-dark to-[#1a1f36]">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-tech-blue opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-tech-purple opacity-5 blur-3xl"></div>

          <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <ScrollReveal>
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Advanced Surveillance Solutions
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
                  Securing Your World
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple">
                    {' '}With Smart Technology
                  </span>
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-xl">
                  ViewTech Enterprise delivers cutting-edge surveillance and security solutions to protect what matters most to you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-tech-blue hover:bg-tech-blue/90" asChild>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link to="/services">Learn More</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <ScrollReveal animation="slide-in-right">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-tech-purple opacity-20 rounded-full blur-3xl animate-float"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tech-blue opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                  <img
                    src="https://images.unsplash.com/photo-1557183059-f908d14018b3?q=80&w=1974&auto=format&fit=crop"
                    alt="Security Camera System"
                    className="w-full rounded-xl shadow-2xl relative z-10"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Comprehensive Security Solutions
                </h2>
                <p className="text-muted-foreground">
                  We deliver innovative surveillance and security technologies tailored to your specific needs.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 100}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    link={service.link}
                  />
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" className="group">
                <Link to="/services" className="flex items-center">
                  <span>View All Services</span>
                  <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slide-in-left">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1494368308039-ed3393ead296?q=80&w=2080&auto=format&fit=crop"
                    alt="Security Control Room"
                    className="w-full rounded-xl shadow-xl relative z-10"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-in-right">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Setting New Standards in Security Solutions
                </h2>
                <p className="text-muted-foreground mb-8">
                  We combine technical expertise with industry insight to deliver security systems that provide real protection. Our dedicated team works closely with you to understand your unique security challenges and build solutions that work for you.
                </p>

                <div className="space-y-4">
                  {[
                    'Expert team of security specialists and technicians',
                    'Customized security solutions for every client',
                    'Latest surveillance and access control technologies',
                    'Ongoing support and maintenance services',
                    'Fast response times for emergency service calls',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check size={18} className="text-primary" />
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button asChild>
                    <Link to="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-tech-blue to-tech-purple text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-white/80">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Client Testimonials
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Clients Say
                </h2>
                <p className="text-muted-foreground">
                  Don't just take our word for it. Here's what our clients have to say about our work.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <TestimonialCard {...testimonial} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-tech-dark text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Enhance Your Security?
                </h2>
                <p className="text-gray-300 mb-8">
                  Let's discuss how our surveillance and security solutions can help protect your property and assets.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="bg-tech-blue hover:bg-tech-blue/90" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link to="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
