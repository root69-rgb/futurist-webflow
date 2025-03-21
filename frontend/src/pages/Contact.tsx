
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useToast } from '@/hooks/use-toast';
import MiniMap from '@/components/map/MiniMap';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { submitContactForm, sendChatMessage, getContactDetails, ContactDetails } from '@/services/contactService';

const ContactPage = () => {
  const { toast } = useToast();
  const [stayInformed, setStayInformed] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch contact details when component mounts
    const fetchContactDetails = async () => {
      try {
        const details = await getContactDetails();
        setContactInfo(details);
      } catch (error) {
        console.error('Failed to fetch contact details:', error);
        toast({
          title: "Error",
          description: "Failed to load contact information. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactDetails();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      stayInformed
    };

    try {
      // Submit form data to backend via service
      const result = await submitContactForm(formData);
      
      toast({
        title: "Message sent!",
        description: result.message || "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      form.reset();
      setStayInformed(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartChat = () => {
    setIsLiveChatOpen(true);
  };

  const handleSendChatMessage = async () => {
    if (!chatMessage.trim()) return;
    
    setIsSendingChat(true);
    try {
      const result = await sendChatMessage(chatMessage);
      toast({
        title: "Message sent",
        description: result.message || "An agent will respond shortly.",
      });
      setChatMessage('');
    } catch (error) {
      console.error('Error sending chat message:', error);
      toast({
        title: "Failed to send message",
        description: "There was a problem sending your chat message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSendingChat(false);
    }
  };

  // Use default values if still loading
  const address = contactInfo?.address || "Loading address...";
  const mapCoordinates = contactInfo?.coordinates || "";
  const plusCode = contactInfo?.plusCode || "";
  const phone = contactInfo?.phone || "";
  const email = contactInfo?.email || "";
  const businessHours = contactInfo?.businessHours || "";

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-tech-dark text-white pt-32 pb-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Contact Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get in Touch With Our Team
                </h1>
                <p className="text-xl text-gray-300">
                  Have a question or ready to start your next project? We'd love to hear from you.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollReveal animation="slide-in-left">
                <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Rajesh Kumar"
                          required
                          disabled={isSubmitting}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          Your Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="rajesh@example.com"
                          required
                          disabled={isSubmitting}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        required
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or inquiry..."
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mb-6">
                      <Switch 
                        id="newsletter" 
                        checked={stayInformed}
                        onCheckedChange={setStayInformed}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="newsletter">Stay informed about our latest offerings and updates</Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-in-right">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help with any questions or concerns. Reach out to us through any of these channels.
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Our Location</h3>
                        <p className="text-muted-foreground">
                          {address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Plus Code: {plusCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Phone Number</h3>
                        <p className="text-muted-foreground">
                          <a href={`tel:${phone}`} className="hover:text-primary">
                            {phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Email Address</h3>
                        <p className="text-muted-foreground">
                          <a href={`mailto:${email}`} className="hover:text-primary">
                            {email}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Business Hours</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {businessHours}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Our Location</h3>
                    {mapCoordinates && <MiniMap address={mapCoordinates} height="250px" />}
                  </div>

                  <div className="bg-muted/50 rounded-xl p-6 border border-border">
                    <div className="flex items-center mb-4">
                      <MessageSquare size={20} className="text-primary mr-2" />
                      <h3 className="text-lg font-medium">Live Chat Support</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Need immediate assistance? Chat with our support team in real-time.
                    </p>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleStartChat}
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Start Live Chat
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-0 bg-background">
          <div className="container mx-auto px-4 pb-20">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Find Us on the Map
                </h2>
                <p className="text-muted-foreground">
                  Visit our office in Bengaluru or reach out online—we're here to help with your technology needs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <MiniMap address={plusCode} height="400px" />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Find answers to common questions about our services and process.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6">
                {[
                  {
                    question: "What is your typical project timeline?",
                    answer: "Project timelines vary based on complexity and scope. A simple setup might take 3-5 days, while complex security systems can take 2-3 weeks. We'll provide a detailed timeline during our initial consultation."
                  },
                  {
                    question: "How do you handle project pricing?",
                    answer: "We offer both fixed-price and customized pricing models depending on your security needs. After understanding your requirements, we'll provide a detailed proposal with transparent pricing."
                  },
                  {
                    question: "Do you provide ongoing support after installation?",
                    answer: "Yes, we offer various maintenance and support packages to ensure your security systems continue to perform optimally after installation. Our team can provide regular check-ups, software updates, and technical support."
                  },
                  {
                    question: "Do you work with residential properties?",
                    answer: "Absolutely! We provide security solutions for both residential and commercial properties across Bengaluru and surrounding areas. Our team can design a system that fits your home's specific needs."
                  }
                ].map((faq, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                      <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-tech-dark text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your Property?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's collaborate to create security solutions that protect what matters most to you.
                </p>
                <Button asChild size="lg" className="bg-tech-blue hover:bg-tech-blue/90">
                  <a href="#top">Contact Us Now</a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />

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
                    <MessageSquare size={18} />
                  </div>
                  <div className="bg-muted-foreground/10 p-3 rounded-lg text-sm max-w-[80%]">
                    <p><strong>Support Agent:</strong> Namaste! Welcome to ViewTech support. How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  className="w-full"
                  placeholder="Type your message here..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  disabled={isSendingChat}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSendingChat) {
                      handleSendChatMessage();
                    }
                  }}
                />
              </div>
              <Button 
                className="shrink-0" 
                size="sm"
                onClick={handleSendChatMessage}
                disabled={!chatMessage.trim() || isSendingChat}
              >
                {isSendingChat ? 'Sending...' : 'Send'}
              </Button>
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
    </>
  );
};

export default ContactPage;
