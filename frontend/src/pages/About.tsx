
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Award, Users, Target, 
  Rocket, Shield, Star, Briefcase
} from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Alexandra Chen',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in technology leadership, Alexandra founded TechVision with a mission to deliver innovative digital solutions.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      bio: 'Marcus leads our technical strategy, bringing expertise in cloud architecture, AI, and emerging technologies to drive innovation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Design Director',
      bio: 'Sophia oversees our design team, ensuring that every digital experience we create is intuitive, engaging, and aesthetically stunning.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'David guides our development team with his extensive knowledge of front-end and back-end technologies and passion for clean code.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
    }
  ];

  const milestones = [
    {
      year: '2013',
      title: 'Company Founded',
      description: 'TechVision was established with a vision to transform businesses through innovative technology solutions.'
    },
    {
      year: '2015',
      title: 'First Major Client',
      description: 'Secured our first enterprise client and delivered a comprehensive digital transformation project.'
    },
    {
      year: '2017',
      title: 'Office Expansion',
      description: 'Opened our second office location and expanded our team to over 25 technology professionals.'
    },
    {
      year: '2019',
      title: 'Innovation Lab Launch',
      description: 'Established our Innovation Lab to research and develop cutting-edge solutions in AI and IoT.'
    },
    {
      year: '2021',
      title: 'International Presence',
      description: 'Expanded our services to international markets and formed strategic partnerships across Europe and Asia.'
    },
    {
      year: '2023',
      title: 'Industry Recognition',
      description: 'Received multiple industry awards for excellence in digital innovation and client satisfaction.'
    }
  ];

  const values = [
    {
      icon: <Target size={24} />,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.'
    },
    {
      icon: <Users size={24} />,
      title: 'Collaboration',
      description: 'We work closely with our clients, fostering partnerships rather than just vendor relationships.'
    },
    {
      icon: <Award size={24} />,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional quality in everything we do.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and the highest ethical standards.'
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-tech-dark text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Story and Vision
                </h1>
                <p className="text-xl text-gray-300">
                  We're a team of passionate technologists committed to helping businesses thrive in the digital era.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slide-in-left">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop"
                    alt="Team Collaboration"
                    className="w-full rounded-xl shadow-xl relative z-10"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-in-right">
                <h2 className="text-3xl font-bold mb-6">Transforming Ideas Into Digital Success Stories</h2>
                <p className="text-muted-foreground mb-6">
                  Founded in 2013, TechVision has grown from a small startup to a leading technology solutions provider with a global presence. Our journey has been defined by a relentless pursuit of innovation and excellence in everything we do.
                </p>
                <p className="text-muted-foreground mb-6">
                  We specialize in developing custom software solutions, mobile applications, and web platforms that help our clients overcome challenges, seize opportunities, and achieve their business objectives.
                </p>
                <p className="text-muted-foreground mb-8">
                  With a team of over 50 talented professionals, we combine technical expertise with industry knowledge to deliver solutions that make a real difference.
                </p>
                <Button asChild>
                  <Link to="/contact">Get to Know Us</Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Values
                </span>
                <h2 className="text-3xl font-bold mb-4">The Principles That Guide Us</h2>
                <p className="text-muted-foreground">
                  These core values shape our approach to work, our relationships with clients, and our company culture.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 100}>
                  <div className="bg-card rounded-xl p-6 border border-border h-full flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Journey
                </span>
                <h2 className="text-3xl font-bold mb-4">Key Milestones</h2>
                <p className="text-muted-foreground">
                  A timeline of significant events that have shaped our company's growth and success.
                </p>
              </div>
            </ScrollReveal>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted"></div>

              <div className="space-y-0">
                {milestones.map((milestone, index) => (
                  <ScrollReveal key={milestone.year} delay={index * 150}>
                    <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0 mb-16 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end md:pr-12">
                        <div className={`text-center md:text-right ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                          <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Center dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>
                      
                      <div className="w-full md:w-1/2 md:pl-12"></div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Team
                </span>
                <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
                <p className="text-muted-foreground">
                  The talented individuals who drive our vision and ensure we deliver exceptional solutions.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={member.name} delay={index * 100}>
                  <div className="bg-card rounded-xl overflow-hidden border border-border transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-tech-blue to-tech-purple text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: <Star size={28} />, value: '10+', label: 'Years of Experience' },
                { icon: <Briefcase size={28} />, value: '300+', label: 'Projects Completed' },
                { icon: <Users size={28} />, value: '50+', label: 'Team Members' },
                { icon: <Rocket size={28} />, value: '25+', label: 'Industry Awards' }
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div>
                    <div className="flex justify-center mb-4 text-white/90">
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-white/80">{stat.label}</p>
                  </div>
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
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Partner With Us?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's collaborate to create technology solutions that drive your business forward.
                </p>
                <Button asChild size="lg" className="bg-tech-blue hover:bg-tech-blue/90">
                  <Link to="/contact" className="flex items-center">
                    Contact Us
                    <ChevronRight size={16} className="ml-2" />
                  </Link>
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

export default AboutPage;
