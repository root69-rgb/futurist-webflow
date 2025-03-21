
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Search, Cctv, Shield, Lock, Monitor, ScanEye, Eye, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of CCTV Security: AI-Powered Surveillance',
      excerpt: 'Discover how artificial intelligence is revolutionizing security cameras and creating smarter surveillance systems for homes and businesses.',
      date: 'May 15, 2023',
      author: 'Sarah Johnson',
      category: 'AI Surveillance',
      image: 'https://images.unsplash.com/photo-1586172022248-d0162ea7c9be?q=80&w=1932&auto=format&fit=crop',
      tags: ['AI', 'CCTV', 'Security'],
      icon: ScanEye
    },
    {
      id: 2,
      title: '5 Key Considerations When Installing CCTV Cameras',
      excerpt: 'Learn the critical factors to consider when planning a CCTV installation to ensure optimal coverage, performance, and reliability.',
      date: 'April 22, 2023',
      author: 'Michael Chen',
      category: 'Installation Tips',
      image: 'https://images.unsplash.com/photo-1557183059-f908d14018b3?q=80&w=1974&auto=format&fit=crop',
      tags: ['CCTV', 'Installation', 'Security'],
      icon: Cctv
    },
    {
      id: 3,
      title: 'Enhancing Home Security: Modern Solutions for Residential Properties',
      excerpt: 'A comprehensive guide to the latest security technologies that can help protect your home from potential threats.',
      date: 'March 10, 2023',
      author: 'David Kim',
      category: 'Home Security',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1780&auto=format&fit=crop',
      tags: ['Home Security', 'CCTV', 'Smart Home'],
      icon: Shield
    },
    {
      id: 4,
      title: 'Video Analytics: Transforming Surveillance Footage into Actionable Insights',
      excerpt: 'Explore how advanced video analytics software can help businesses gain valuable insights from their security camera footage.',
      date: 'February 28, 2023',
      author: 'Anna Martinez',
      category: 'Video Analytics',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1770&auto=format&fit=crop',
      tags: ['Video Analytics', 'Business Intelligence', 'CCTV'],
      icon: Eye
    },
    {
      id: 5,
      title: 'Integrating Access Control with CCTV Systems for Enhanced Security',
      excerpt: 'Learn how combining surveillance with access control creates a more comprehensive and effective security solution.',
      date: 'January 15, 2023',
      author: 'James Wilson',
      category: 'Integrated Security',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1770&auto=format&fit=crop',
      tags: ['Access Control', 'CCTV', 'Integration'],
      icon: Lock
    },
    {
      id: 6,
      title: 'Maintaining Your CCTV System: Essential Care and Troubleshooting',
      excerpt: 'A practical guide to keeping your surveillance system in optimal condition and resolving common issues quickly.',
      date: 'December 5, 2022',
      author: 'Emily Thompson',
      category: 'Maintenance',
      image: 'https://images.unsplash.com/photo-1493020258366-be3ead1b3027?q=80&w=1772&auto=format&fit=crop',
      tags: ['Maintenance', 'Troubleshooting', 'CCTV'],
      icon: Server
    }
  ];
  
  const categories = [
    'All Categories',
    'AI Surveillance',
    'Installation Tips',
    'Home Security',
    'Video Analytics',
    'Integrated Security',
    'Maintenance',
    'Business Security',
    'Remote Monitoring'
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
                  Security Insights
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  ViewTech Security Blog
                </h1>
                <p className="text-xl text-gray-300">
                  Stay up-to-date with the latest trends, tips, and insights in surveillance technology and security solutions.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <ScrollReveal key={post.id} delay={index * 100}>
                      <div className="bg-card rounded-xl overflow-hidden border border-border transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs mr-3">
                              <post.icon size={12} className="mr-1" />
                              {post.category}
                            </span>
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {post.date}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User size={14} className="mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">{post.author}</span>
                            </div>
                            <Link to={`/blog/${post.id}`} className="text-primary flex items-center text-sm font-medium hover:underline">
                              Read More
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <Button variant="outline" className="mr-2">Previous</Button>
                  <Button variant="outline" className="ml-2">Next</Button>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <ScrollReveal>
                  <div className="sticky top-24">
                    <div className="bg-card rounded-xl p-6 border border-border mb-8">
                      <h3 className="text-lg font-bold mb-4">Search</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input 
                          placeholder="Search security articles..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-xl p-6 border border-border mb-8">
                      <h3 className="text-lg font-bold mb-4">Categories</h3>
                      <ul className="space-y-2">
                        {categories.map((category, index) => (
                          <li key={index}>
                            <Link 
                              to="#" 
                              className={`block py-2 px-3 rounded-lg hover:bg-muted transition-colors ${
                                index === 0 ? 'bg-primary/10 text-primary font-medium' : ''
                              }`}
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-card rounded-xl p-6 border border-border mb-8">
                      <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {['CCTV', 'Security', 'AI', 'Surveillance', 'Home Security', 'Video Analytics', 'Access Control', 'Camera', 'Monitoring'].map((tag, index) => (
                          <Link 
                            key={index}
                            to="#" 
                            className="inline-block px-3 py-1 rounded-full bg-muted text-sm hover:bg-primary hover:text-white transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-xl p-6 border border-border">
                      <h3 className="text-lg font-bold mb-4">Security Resources</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Cctv size={18} className="text-primary mt-1 mr-3" />
                          <div>
                            <h4 className="font-medium">CCTV Buying Guide</h4>
                            <p className="text-sm text-muted-foreground">Everything you need to know before purchasing a security camera system.</p>
                            <Link to="#" className="text-primary text-sm font-medium hover:underline">Download Guide</Link>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Shield size={18} className="text-primary mt-1 mr-3" />
                          <div>
                            <h4 className="font-medium">Security Assessment Checklist</h4>
                            <p className="text-sm text-muted-foreground">Evaluate your current security measures with our comprehensive checklist.</p>
                            <Link to="#" className="text-primary text-sm font-medium hover:underline">Download Checklist</Link>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Eye size={18} className="text-primary mt-1 mr-3" />
                          <div>
                            <h4 className="font-medium">Camera Placement Tips</h4>
                            <p className="text-sm text-muted-foreground">Learn the best practices for optimal camera placement and coverage.</p>
                            <Link to="#" className="text-primary text-sm font-medium hover:underline">Read More</Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Security Newsletter</h2>
                <p className="text-muted-foreground mb-8">
                  Get the latest security insights, surveillance technology updates, and exclusive tips delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-grow"
                  />
                  <Button>Subscribe</Button>
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

export default BlogPage;
