
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Shopping Mall Security System',
      description: 'Comprehensive security solution for a large shopping mall featuring 120+ surveillance cameras, access control systems, and central monitoring station. Integrated with AI-powered analytics for crowd monitoring and suspicious behavior detection.',
      categories: ['Commercial', 'CCTV Installation'],
      image: 'https://images.unsplash.com/photo-1516638396524-4aae98337f61?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Residential Community Surveillance',
      description: 'End-to-end security system for a gated community with 50+ homes. Includes perimeter cameras, license plate recognition at entry points, and individual home security systems with mobile app monitoring for residents.',
      categories: ['Residential', 'Smart Security'],
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 3,
      title: 'AI-Powered Bank Security',
      description: 'Advanced security solution for a national bank chain featuring facial recognition, behavior analysis, and real-time alert systems. Integrated with existing access control for seamless security management.',
      categories: ['AI Solutions', 'Financial Security'],
      image: 'https://images.unsplash.com/photo-1551704662-737b99febffd?q=80&w=1974&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 4,
      title: 'Hospital Surveillance System',
      description: 'Comprehensive security and monitoring solution for a large medical facility. Features include restricted area access control, patient monitoring, and integration with emergency response systems.',
      categories: ['Healthcare', 'CCTV Installation'],
      image: 'https://images.unsplash.com/photo-1516466040550-25d1e591f289?q=80&w=2069&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 5,
      title: 'Industrial Site Security',
      description: 'Rugged outdoor surveillance system for a large manufacturing complex. Includes thermal cameras, perimeter detection, and integration with fire alarm systems for comprehensive safety coverage.',
      categories: ['Industrial', 'Perimeter Security'],
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2644&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 6,
      title: 'School District Security Upgrade',
      description: 'Multi-site security implementation across 12 school buildings. Features include visitor management, emergency lockdown systems, and classroom monitoring with privacy controls.',
      categories: ['Education', 'Multi-Site Security'],
      image: 'https://images.unsplash.com/photo-1622557850710-88fe174992cb?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 7,
      title: 'Smart Home Security Integration',
      description: 'Luxury home automation and security installation featuring integration with lighting, climate control, and entertainment systems. Includes voice control and AI-based occupancy detection.',
      categories: ['Residential', 'Smart Security'],
      image: 'https://images.unsplash.com/photo-1585362028209-0d6957ebe8a1?q=80&w=2069&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 8,
      title: 'Hotel Chain Surveillance Upgrade',
      description: 'Major security overhaul for an international hotel chain. Included standardizing equipment across 28 properties while maintaining individual site customizations for local requirements.',
      categories: ['Hospitality', 'Multi-Site Security'],
      image: 'https://images.unsplash.com/photo-1610387140842-e8b386b6650c?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 9,
      title: 'City-Wide Traffic Monitoring',
      description: 'Large-scale municipal project implementing traffic cameras at 75 intersections with AI-powered congestion analysis and incident detection capabilities. Integrated with emergency services dispatch.',
      categories: ['Government', 'Smart City'],
      image: 'https://images.unsplash.com/photo-1561608175-85ee2ad6283c?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    }
  ];

  const categories = [
    'all',
    'Commercial',
    'Residential',
    'Industrial',
    'Healthcare',
    'Government',
    'Education'
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

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
                  Our Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Real Security Solutions for Real Challenges
                </h1>
                <p className="text-xl text-gray-300">
                  Explore our collection of surveillance and security installations that have helped protect businesses, communities, and public spaces.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filter === category ? "default" : "outline"}
                    className={filter === category ? "bg-primary" : ""}
                    onClick={() => setFilter(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 100}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    categories={project.categories}
                    link={project.link}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your Space?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Contact us today to discuss your security needs and discover how our surveillance solutions can protect what matters most to you.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="/contact">Get a Free Security Assessment</a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PortfolioPage;
