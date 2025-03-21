
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Trash,
  Plus
} from 'lucide-react';

const AdminFooterEditor = () => {
  const { toast } = useToast();
  
  // Company information state
  const [companyInfo, setCompanyInfo] = useState({
    name: "ViewTech Enterprise",
    description: "Securing your world with advanced surveillance and security solutions. We protect what matters most to you with cutting-edge technology.",
    address: "123 Security Avenue, Tech Park, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@viewtech.com"
  });
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "facebook", url: "#", icon: <Facebook size={20} /> },
    { id: 2, platform: "twitter", url: "#", icon: <Twitter size={20} /> },
    { id: 3, platform: "linkedin", url: "#", icon: <Linkedin size={20} /> },
    { id: 4, platform: "instagram", url: "#", icon: <Instagram size={20} /> }
  ]);
  
  // Quick links state
  const [quickLinks, setQuickLinks] = useState([
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "About Us", url: "/about" },
    { id: 3, label: "Services", url: "/services" },
    { id: 4, label: "Portfolio", url: "/portfolio" },
    { id: 5, label: "Blog", url: "/blog" },
    { id: 6, label: "Contact", url: "/contact" }
  ]);
  
  // Legal links state
  const [legalLinks, setLegalLinks] = useState([
    { id: 1, label: "Privacy Policy", url: "/privacy" },
    { id: 2, label: "Terms of Service", url: "/terms" },
    { id: 3, label: "Cookie Policy", url: "/cookies" }
  ]);
  
  // New link state
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  
  // Handler for company info changes
  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler for social link changes
  const handleSocialLinkChange = (id: number, url: string) => {
    setSocialLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, url } : link
      )
    );
  };
  
  // Handler for adding a new quick link
  const handleAddQuickLink = () => {
    if (newLink.label && newLink.url) {
      setQuickLinks(prev => [
        ...prev, 
        { 
          id: Math.max(0, ...prev.map(link => link.id)) + 1,
          label: newLink.label,
          url: newLink.url
        }
      ]);
      setNewLink({ label: "", url: "" });
    }
  };
  
  // Handler for removing a quick link
  const handleRemoveQuickLink = (id: number) => {
    setQuickLinks(prev => prev.filter(link => link.id !== id));
  };
  
  // Handler for adding a new legal link
  const handleAddLegalLink = () => {
    if (newLink.label && newLink.url) {
      setLegalLinks(prev => [
        ...prev, 
        { 
          id: Math.max(0, ...prev.map(link => link.id)) + 1,
          label: newLink.label,
          url: newLink.url
        }
      ]);
      setNewLink({ label: "", url: "" });
    }
  };
  
  // Handler for removing a legal link
  const handleRemoveLegalLink = (id: number) => {
    setLegalLinks(prev => prev.filter(link => link.id !== id));
  };
  
  // Handler for saving all changes
  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    toast({
      title: "Changes saved",
      description: "Footer content has been updated successfully"
    });
  };
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="quicklinks">Quick Links</TabsTrigger>
          <TabsTrigger value="legal">Legal Links</TabsTrigger>
        </TabsList>
        
        {/* Company Information Tab */}
        <TabsContent value="company">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={companyInfo.description}
                    onChange={handleCompanyInfoChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={companyInfo.address}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Links Tab */}
        <TabsContent value="social">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
                      {link.icon}
                    </div>
                    <Input
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                      placeholder={`${link.platform} URL`}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Quick Links Tab */}
        <TabsContent value="quicklinks">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <div key={link.id} className="flex items-center space-x-3">
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        setQuickLinks(prev => 
                          prev.map(item => 
                            item.id === link.id ? { ...item, label: e.target.value } : item
                          )
                        );
                      }}
                      placeholder="Link Label"
                      className="flex-1"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        setQuickLinks(prev => 
                          prev.map(item => 
                            item.id === link.id ? { ...item, url: e.target.value } : item
                          )
                        );
                      }}
                      placeholder="Link URL"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveQuickLink(link.id)}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Input
                    value={newLink.label}
                    onChange={(e) => setNewLink({...newLink, label: e.target.value})}
                    placeholder="New Link Label"
                    className="flex-1"
                  />
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    placeholder="New Link URL"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleAddQuickLink}
                    className="flex-shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Legal Links Tab */}
        <TabsContent value="legal">
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {legalLinks.map((link) => (
                  <div key={link.id} className="flex items-center space-x-3">
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        setLegalLinks(prev => 
                          prev.map(item => 
                            item.id === link.id ? { ...item, label: e.target.value } : item
                          )
                        );
                      }}
                      placeholder="Link Label"
                      className="flex-1"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        setLegalLinks(prev => 
                          prev.map(item => 
                            item.id === link.id ? { ...item, url: e.target.value } : item
                          )
                        );
                      }}
                      placeholder="Link URL"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveLegalLink(link.id)}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Input
                    value={newLink.label}
                    onChange={(e) => setNewLink({...newLink, label: e.target.value})}
                    placeholder="New Link Label"
                    className="flex-1"
                  />
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    placeholder="New Link URL"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleAddLegalLink}
                    className="flex-shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset Changes</Button>
        <Button onClick={handleSaveChanges}>Save All Changes</Button>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="bg-tech-dark text-white rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple">
                {companyInfo.name}
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                {companyInfo.description}
              </p>
              <div className="flex space-x-3">
                {socialLinks.map(link => (
                  <div key={link.id} className="text-gray-300 hover:text-tech-blue transition-colors">
                    {link.icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.id} className="text-sm text-gray-300 hover:text-tech-blue transition-colors">
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>{companyInfo.address}</p>
                <p>{companyInfo.phone}</p>
                <p>{companyInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFooterEditor;
