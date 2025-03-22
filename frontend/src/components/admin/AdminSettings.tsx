
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, RefreshCw, Trash, Upload } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

// Dummy data - Replace with API calls to your Express backend
const DUMMY_SETTINGS = {
  general: {
    siteName: 'ViewTech',
    tagline: 'Professional Web Design & Development',
    siteDescription: 'ViewTech offers professional web design and development services for businesses of all sizes.',
    favicon: '/favicon.ico',
    logo: '/logo.png',
    contactEmail: 'contact@viewtech.example',
    phoneNumber: '+1 (555) 123-4567',
  },
  seo: {
    metaTitle: 'ViewTech - Web Design & Development Services',
    metaDescription: 'Professional web design, development, and SEO services to help your business grow online.',
    ogImage: '/og-image.png',
    enableSitemap: true,
    enableRobotsTxt: true,
    googleAnalyticsId: 'UA-XXXXXXXX-X',
  },
  social: {
    facebook: 'https://facebook.com/viewtech',
    twitter: 'https://twitter.com/viewtech',
    instagram: 'https://instagram.com/viewtech',
    linkedin: 'https://linkedin.com/company/viewtech',
    youtube: '',
    github: '',
  },
  advanced: {
    customHeaderCode: '',
    customFooterCode: '',
    maintenanceMode: false,
    cacheEnabled: true,
    debugMode: false,
  }
};

// Form schemas
const generalFormSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  tagline: z.string(),
  siteDescription: z.string(),
  contactEmail: z.string().email("Must be a valid email"),
  phoneNumber: z.string(),
});

const seoFormSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  googleAnalyticsId: z.string(),
  enableSitemap: z.boolean(),
  enableRobotsTxt: z.boolean(),
});

const socialFormSchema = z.object({
  facebook: z.string().url("Must be a valid URL").or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").or(z.literal("")),
  youtube: z.string().url("Must be a valid URL").or(z.literal("")),
  github: z.string().url("Must be a valid URL").or(z.literal("")),
});

const advancedFormSchema = z.object({
  customHeaderCode: z.string(),
  customFooterCode: z.string(),
  maintenanceMode: z.boolean(),
  cacheEnabled: z.boolean(),
  debugMode: z.boolean(),
});

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  // Initialize form hooks for each tab
  const generalForm = useForm({
    resolver: zodResolver(generalFormSchema),
    defaultValues: DUMMY_SETTINGS.general,
  });
  
  const seoForm = useForm({
    resolver: zodResolver(seoFormSchema),
    defaultValues: DUMMY_SETTINGS.seo,
  });
  
  const socialForm = useForm({
    resolver: zodResolver(socialFormSchema),
    defaultValues: DUMMY_SETTINGS.social,
  });
  
  const advancedForm = useForm({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: DUMMY_SETTINGS.advanced,
  });
  
  const onGeneralSubmit = (data) => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/settings/general
    
    console.log("General settings saved:", data);
    
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    });
  };
  
  const onSeoSubmit = (data) => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/settings/seo
    
    console.log("SEO settings saved:", data);
    
    toast({
      title: "Settings saved",
      description: "SEO settings have been updated successfully.",
    });
  };
  
  const onSocialSubmit = (data) => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/settings/social
    
    console.log("Social settings saved:", data);
    
    toast({
      title: "Settings saved",
      description: "Social media settings have been updated successfully.",
    });
  };
  
  const onAdvancedSubmit = (data) => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/settings/advanced
    
    console.log("Advanced settings saved:", data);
    
    toast({
      title: "Settings saved",
      description: "Advanced settings have been updated successfully.",
    });
  };
  
  const clearCache = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // POST /api/settings/clear-cache
    
    toast({
      title: "Cache cleared",
      description: "Website cache has been cleared successfully.",
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="social">Social Media</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Form {...generalForm}>
          <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your website.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          A short description or slogan for your site.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-6">
                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormDescription>
                          Briefly describe your website or business.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <FormLabel>Logo</FormLabel>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                        <img src="/placeholder.svg" alt="Logo preview" className="max-h-full max-w-full" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 200x60px, PNG or SVG format
                    </p>
                  </div>
                  
                  <div>
                    <FormLabel>Favicon</FormLabel>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="h-8 w-8 rounded-md border flex items-center justify-center bg-muted">
                        <img src="/favicon.ico" alt="Favicon preview" className="max-h-full max-w-full" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 32x32px, ICO format
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={generalForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="seo">
        <Form {...seoForm}>
          <form onSubmit={seoForm.handleSubmit(onSeoSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The title that appears in search engine results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormDescription>
                          The description that appears in search engine results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Social Sharing Image (OG Image)</FormLabel>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="h-24 w-32 rounded-md border flex items-center justify-center bg-muted overflow-hidden">
                        <img src="/og-image.png" alt="OG Image preview" className="w-full h-full object-cover" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 1200x630px, PNG or JPG format
                    </p>
                  </div>
                  
                  <FormField
                    control={seoForm.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="UA-XXXXXXXX-X or G-XXXXXXXXXX" />
                        </FormControl>
                        <FormDescription>
                          Enter your Google Analytics tracking ID.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={seoForm.control}
                      name="enableSitemap"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Sitemap</FormLabel>
                            <FormDescription>
                              Automatically generate and serve an XML sitemap for search engines.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={seoForm.control}
                      name="enableRobotsTxt"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Robots.txt</FormLabel>
                            <FormDescription>
                              Generate a robots.txt file to guide search engine crawlers.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save SEO Settings
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="social">
        <Form {...socialForm}>
          <form onSubmit={socialForm.handleSubmit(onSocialSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={socialForm.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://facebook.com/yourpage" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://twitter.com/yourhandle" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://instagram.com/yourprofile" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/company/yourcompany" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://youtube.com/c/yourchannel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={socialForm.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://github.com/yourorganization" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Social Settings
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      
      <TabsContent value="advanced">
        <Form {...advancedForm}>
          <form onSubmit={advancedForm.handleSubmit(onAdvancedSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={advancedForm.control}
                    name="customHeaderCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Header Code</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} placeholder="<!-- Add custom code to be placed in the <head> section -->" className="font-mono text-sm" />
                        </FormControl>
                        <FormDescription>
                          Add custom HTML, JS, or CSS to be inserted into the site header.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={advancedForm.control}
                    name="customFooterCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Footer Code</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} placeholder="<!-- Add custom code to be placed before the closing </body> tag -->" className="font-mono text-sm" />
                        </FormControl>
                        <FormDescription>
                          Add custom HTML, JS, or CSS to be inserted at the end of the site.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={advancedForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Maintenance Mode</FormLabel>
                            <FormDescription>
                              Temporarily make your site inaccessible to visitors while showing a maintenance message.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={advancedForm.control}
                      name="cacheEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Caching</FormLabel>
                            <FormDescription>
                              Improve performance by caching pages and assets.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={advancedForm.control}
                      name="debugMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Debug Mode</FormLabel>
                            <FormDescription>
                              Enable detailed error messages and logging. Not recommended for production.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-base font-medium mb-2">System Maintenance</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="button" variant="outline" onClick={clearCache}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Clear Cache
                      </Button>
                      <Button type="button" variant="outline" className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Reset All Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Advanced Settings
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default AdminSettings;
