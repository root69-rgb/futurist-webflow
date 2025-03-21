
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MiniMap from "@/components/map/MiniMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getContactDetails, updateContactDetails, ContactDetails } from "@/services/contactService";

const AdminContactEdit = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [originalDetails, setOriginalDetails] = useState<ContactDetails | null>(null);
  
  // State for the current contact details being edited
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    address: "",
    coordinates: "",
    plusCode: "",
    phone: "",
    email: "",
    businessHours: ""
  });

  useEffect(() => {
    // Fetch contact details when component mounts
    const fetchContactDetails = async () => {
      try {
        const details = await getContactDetails();
        setContactDetails(details);
        setOriginalDetails(details);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const result = await updateContactDetails(contactDetails);
      
      setOriginalDetails(contactDetails);
      
      toast({
        title: "Changes saved",
        description: result.message || "Contact information has been updated successfully"
      });
    } catch (error) {
      console.error("Error saving contact details:", error);
      toast({
        title: "Error",
        description: "Failed to update contact information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (originalDetails) {
      setContactDetails(originalDetails);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Office Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={contactDetails.address}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinates">Map Coordinates</Label>
                  <Input
                    id="coordinates"
                    name="coordinates"
                    value={contactDetails.coordinates}
                    onChange={handleChange}
                    placeholder="e.g., 13.079977006037252, 77.49676704497915"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plusCode">Plus Code</Label>
                  <Input
                    id="plusCode"
                    name="plusCode"
                    value={contactDetails.plusCode}
                    onChange={handleChange}
                    placeholder="e.g., 3FHW+XP Bengaluru, Karnataka, India"
                    disabled={isSaving}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    value={contactDetails.email}
                    onChange={handleChange}
                    placeholder="info@example.com"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Textarea
                    id="businessHours"
                    name="businessHours"
                    value={contactDetails.businessHours}
                    onChange={handleChange}
                    rows={3}
                    className="resize-none"
                    disabled={isSaving}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Map Preview</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This is how your location will appear on the contact page
            </p>
          </div>
          <div className="border border-border rounded-md overflow-hidden">
            <MiniMap address={contactDetails.coordinates} height="300px" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={handleReset}
          disabled={isSaving}
        >
          Reset Changes
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">Current Contact Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-3">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Office Location</h4>
                <p className="text-sm text-muted-foreground">{contactDetails.address}</p>
                <p className="text-xs text-muted-foreground mt-1">Plus Code: {contactDetails.plusCode}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-3">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Phone</h4>
                <p className="text-sm text-muted-foreground">{contactDetails.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-3">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">{contactDetails.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/10 text-primary mr-3">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium">Business Hours</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{contactDetails.businessHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactEdit;
