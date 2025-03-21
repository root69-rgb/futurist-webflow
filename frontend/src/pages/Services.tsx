
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cctv, Eye, Monitor, ScanEye, Shield, Lock,
  Network, Server, Camera, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ServicePage = () => {
  const services = [
    {
      id: 'cctv-setup',
      icon: Cctv,
      title: 'CCTV Camera Setup',
      description: 'Professional installation, configuration, and optimization of state-of-the-art CCTV systems for comprehensive surveillance coverage.',
      features: [
        'HD and 4K camera installation',
        'Strategic placement consultation',
        'Wired and wireless options',
        'Remote viewing setup',
        'Night vision optimization'
      ],
      image: 'https://images.unsplash.com/photo-1557183059-f908d14018b3?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 'virtual-watchdog',
      icon: Eye,
      title: 'Virtual Watch Dog',
      description: 'Around-the-clock remote monitoring services that act as a virtual security guard for your property.',
      features: [
        '24/7 remote monitoring',
        'Real-time alert notifications',
        'Suspicious activity detection',
        'Incident verification',
        'Emergency dispatch coordination'
      ],
      image: 'https://images.unsplash.com/photo-1494368308039-ed3393ead296?q=80&w=2080&auto=format&fit=crop'
    },
    {
      id: 'cctv-doctor',
      icon: Monitor,
      title: 'CCTV Doctor',
      description: 'Comprehensive maintenance, troubleshooting, and repair services to keep your surveillance systems operating at peak performance.',
      features: [
        'System diagnostics and health checks',
        'Camera and DVR/NVR repairs',
        'Software updates and upgrades',
        'Preventative maintenance',
        'Emergency repair services'
      ],
      image: 'https://images.unsplash.com/photo-1588817690129-ae0e574d5b51?q=80&w=1932&auto=format&fit=crop'
    },
    {
      id: 'ai-analytics',
      icon: ScanEye,
      title: 'EYEQ - AI Video Analytics',
      description: 'Advanced artificial intelligence solutions that transform standard surveillance footage into actionable security and business intelligence.',
      features: [
        'Object and person recognition',
        'Behavior analysis and anomaly detection',
        'Facial recognition capabilities',
        'Traffic and crowd monitoring',
        'Custom alert parameters'
      ],
      image: 'https://images.unsplash.com/photo-1639037038270-73b5ebd6863a?q=80&w=1932&auto=format&fit=crop'
    },
    {
      id: 'e-surveillance',
      icon: Shield,
      title: 'E-surveillance Service',
      description: 'Integrated electronic surveillance solutions that provide comprehensive security coverage for commercial and residential properties.',
      features: [
        'Multi-layered security systems',
        'Motion and intrusion detection',
        'Perimeter surveillance',
        'Glass break and vibration sensors',
        'Mobile app monitoring integration'
      ],
      image: 'https://images.unsplash.com/photo-1519069060891-f8c5a35b7f19?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'access-control',
      icon: Lock,
      title: 'Access Control Systems',
      description: 'Comprehensive access control solutions including boom barriers, electronic doors, and advanced entry systems.',
      features: [
        'Boom barrier installation',
        'Electronic door systems',
        'Keyless entry solutions',
        'Badge and biometric access',
        'Integration with CCTV systems'
      ],
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const additionalServices = [
    { icon: Camera, title: 'Home Security Cameras' },
    { icon: Network, title: 'Network Security' },
    { icon: Server, title: 'Server Room Monitoring' },
    { icon: Shield, title: 'Cybersecurity' },
    { icon: Lock, title: 'Smart Locks' }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-tech-dark text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Services
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Advanced Security & Surveillance Solutions
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  From CCTV installation to AI-powered analytics, we offer a comprehensive suite of security services to protect your property and assets.
                </p>
                <Button asChild size="lg" className="bg-tech-blue hover:bg-tech-blue/90">
                  <a href="#services-list">Explore Our Services</a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services List */}
        <section id="services-list" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Comprehensive Security Services
                </h2>
                <p className="text-muted-foreground">
                  Our team of security experts delivers cutting-edge solutions tailored to your specific needs.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-32">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    <ScrollReveal animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                      <div className="relative">
                        <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"></div>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full rounded-xl shadow-xl relative z-10 h-[300px] object-cover"
                        />
                      </div>
                    </ScrollReveal>

                    <ScrollReveal animation={index % 2 === 0 ? "slide-in-right" : "slide-in-left"}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                          <service.icon size={20} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <ChevronRight size={18} className="text-primary mr-2 mt-1" />
                            <p>{feature}</p>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link to={`/contact?service=${service.id}`}>Get a Quote</Link>
                      </Button>
                    </ScrollReveal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Additional Security Services
                </h2>
                <p className="text-muted-foreground">
                  Beyond our core offerings, we provide specialized security solutions to meet diverse needs.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {additionalServices.map((service, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-card hover:bg-card/90 p-6 rounded-xl border border-border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-md bg-primary/10 text-primary mb-4">
                      <service.icon size={24} />
                    </div>
                    <h3 className="font-medium text-lg mb-2">{service.title}</h3>
                    <Button variant="link" asChild className="text-primary">
                      <Link to="/contact">Learn More</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-tech-dark to-tech-dark/95 text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Enhance Your Security?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Contact us today to discuss how our security services can protect what matters most to you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="bg-tech-blue hover:bg-tech-blue/90">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
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

export default ServicePage;
