
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminAnalytics from './AdminAnalytics';
import AdminContactEdit from './AdminContactEdit';
import AdminBlogManager from './AdminBlogManager';
import AdminPortfolioManager from './AdminPortfolioManager';
import AdminFooterEditor from './AdminFooterEditor';
import AdminMessages from './AdminMessages';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PolicyManager, { PolicyType } from '../policy/PolicyManager';
import { Button } from '@/components/ui/button';
import AdminPageManager from './AdminPageManager';
import AdminUserManager from './AdminUserManager';
import AdminMediaLibrary from './AdminMediaLibrary';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const [openPolicy, setOpenPolicy] = useState<PolicyType | null>(null);

  const handlePolicyOpen = (type: PolicyType) => {
    setOpenPolicy(type);
  };

  const handlePolicyClose = () => {
    setOpenPolicy(null);
  };

  return (
    <>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-8 overflow-x-auto flex-nowrap">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>
                View website traffic, user engagement and SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update location, contact details and business hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminContactEdit />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Page Manager</CardTitle>
              <CardDescription>
                Create, edit, and organize website pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminPageManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Manage website settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminSettings />
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Legal Policies</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review and customize your legal policies. Click to preview each policy.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePolicyOpen('privacy')}
                  >
                    Privacy Policy
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handlePolicyOpen('terms')}
                  >
                    Terms of Service
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handlePolicyOpen('cookies')}
                  >
                    Cookie Policy
                  </Button>
                </div>
              </div>
              
              <AdminFooterEditor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                View and manage contact form submissions from website visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminMessages />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blog" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Blog Manager</CardTitle>
              <CardDescription>
                Create, edit, and manage blog posts, categories, and tags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminBlogManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Manager</CardTitle>
              <CardDescription>
                Add, edit, or remove portfolio projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminPortfolioManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="media" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Upload, organize, and manage your media files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend connection pending</AlertTitle>
                <AlertDescription>
                  This is a frontend template ready for future backend integration. To implement backend functionality, connect to your Node.js/Express API endpoints.
                </AlertDescription>
              </Alert>
              <AdminMediaLibrary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PolicyManager 
        open={openPolicy}
        onClose={handlePolicyClose}
      />
    </>
  );
};

export default AdminDashboard;
