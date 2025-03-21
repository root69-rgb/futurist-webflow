
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash, Plus, Image, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  location: string;
  date: string;
  imageUrl: string;
  featured: boolean;
}

const AdminPortfolioManager = () => {
  const { toast } = useToast();
  
  // Demo data for portfolio projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Landmark Tech Park Security System",
      description: "Complete security solution for a 500,000 sq ft commercial property including CCTV, access control, and alarm systems.",
      category: "Commercial",
      client: "Landmark Properties Ltd",
      location: "Bengaluru, India",
      date: "2023-02-15",
      imageUrl: "/placeholder.svg",
      featured: true
    },
    {
      id: "2",
      title: "Prestige Residential Complex",
      description: "Smart home security integration for a luxury residential complex with 200 apartments.",
      category: "Residential",
      client: "Prestige Group",
      location: "Mumbai, India",
      date: "2023-04-22",
      imageUrl: "/placeholder.svg",
      featured: true
    },
    {
      id: "3",
      title: "Infosys Campus Surveillance Upgrade",
      description: "Upgrading existing surveillance systems with AI-powered cameras and analytics.",
      category: "Corporate",
      client: "Infosys Ltd",
      location: "Pune, India",
      date: "2023-06-10",
      imageUrl: "/placeholder.svg",
      featured: false
    },
    {
      id: "4",
      title: "Central Mall Access Control System",
      description: "Implementation of biometric and NFC-based access control for a major shopping mall.",
      category: "Retail",
      client: "Central Retail Group",
      location: "Chennai, India",
      date: "2023-08-05",
      imageUrl: "/placeholder.svg",
      featured: false
    }
  ]);
  
  // State for dialogs
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // State for form data
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    category: "",
    client: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    imageUrl: "/placeholder.svg",
    featured: false
  });
  
  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Handlers for projects
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setNewProject(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setNewProject(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAddProject = () => {
    // In a real app, this would be an API call
    const id = Math.random().toString(36).substr(2, 9);
    
    // If there's a new image file, we would upload it here
    // For now, we'll just use the preview URL or default
    const imageUrl = previewImage || newProject.imageUrl;
    
    setProjects(prev => [...prev, { ...newProject, id, imageUrl } as Project]);
    setIsNewProjectOpen(false);
    setSelectedFile(null);
    setPreviewImage(null);
    setNewProject({
      title: "",
      description: "",
      category: "",
      client: "",
      location: "",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "/placeholder.svg",
      featured: false
    });
    toast({
      title: "Project added",
      description: "The project has been successfully added to your portfolio"
    });
  };
  
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setNewProject(project);
    setPreviewImage(null);
    setSelectedFile(null);
    setIsEditProjectOpen(true);
  };
  
  const handleUpdateProject = () => {
    // In a real app, this would be an API call
    const updatedProjects = projects.map(project => 
      project.id === selectedProject?.id 
        ? { 
            ...newProject, 
            imageUrl: previewImage || newProject.imageUrl 
          } as Project 
        : project
    );
    
    setProjects(updatedProjects);
    setIsEditProjectOpen(false);
    setSelectedFile(null);
    setPreviewImage(null);
    setNewProject({
      title: "",
      description: "",
      category: "",
      client: "",
      location: "",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "/placeholder.svg",
      featured: false
    });
    toast({
      title: "Project updated",
      description: "The project has been successfully updated"
    });
  };
  
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully removed from your portfolio"
    });
  };
  
  const handlePreviewProject = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a URL for the file for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium">Portfolio Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio showcase with these projects
          </p>
        </div>
        <Button onClick={() => setIsNewProjectOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add New Project
        </Button>
      </div>
      
      <div className="rounded-md border mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePreviewProject(project)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Portfolio Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold">{projects.length}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <p className="text-sm text-muted-foreground">Featured Projects</p>
                <p className="text-3xl font-bold">{projects.filter(p => p.featured).length}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-3xl font-bold">{new Set(projects.map(p => p.category)).size}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-md border border-border">
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="text-3xl font-bold">{new Set(projects.map(p => p.location)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Quick Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use high-quality images for your portfolio projects (recommended size: 1200x800px)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Keep project descriptions concise but informative</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Mark your best work as "Featured" to highlight it on the homepage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Include specific details about your role and the technologies used</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Portfolio Project</DialogTitle>
            <DialogDescription>
              Fill in the details to showcase your work in the portfolio
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={newProject.title}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input
                id="category"
                name="category"
                value={newProject.category}
                onChange={handleProjectChange}
                className="col-span-3"
                placeholder="e.g., Commercial, Residential, Corporate"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">Client</Label>
              <Input
                id="client"
                name="client"
                value={newProject.client}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input
                id="location"
                name="location"
                value={newProject.location}
                onChange={handleProjectChange}
                className="col-span-3"
                placeholder="e.g., Bengaluru, India"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Completion Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newProject.date}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleProjectChange}
                className="col-span-3"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUpload" className="text-right">Project Image</Label>
              <div className="col-span-3">
                <Label 
                  htmlFor="imageUpload" 
                  className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                >
                  <Upload size={16} />
                  <span>{selectedFile ? selectedFile.name : "Choose a file..."}</span>
                </Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewImage && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-32 rounded-md object-cover" 
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a high-quality image (recommended: 1200x800px)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={newProject.featured}
                  onChange={handleProjectChange as any}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="featured" className="text-sm font-normal">Show this project on the homepage</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddProject}>
              <Plus size={16} className="mr-2" />
              Add Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Project</DialogTitle>
            <DialogDescription>
              Update the details of your portfolio project
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">Project Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={newProject.title}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">Category</Label>
              <Input
                id="edit-category"
                name="category"
                value={newProject.category}
                onChange={handleProjectChange}
                className="col-span-3"
                placeholder="e.g., Commercial, Residential, Corporate"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-client" className="text-right">Client</Label>
              <Input
                id="edit-client"
                name="client"
                value={newProject.client}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">Location</Label>
              <Input
                id="edit-location"
                name="location"
                value={newProject.location}
                onChange={handleProjectChange}
                className="col-span-3"
                placeholder="e.g., Bengaluru, India"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">Completion Date</Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                value={newProject.date}
                onChange={handleProjectChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={newProject.description}
                onChange={handleProjectChange}
                className="col-span-3"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-imageUpload" className="text-right">Project Image</Label>
              <div className="col-span-3">
                <div className="flex items-center gap-4 mb-2">
                  <img 
                    src={previewImage || newProject.imageUrl} 
                    alt={newProject.title} 
                    className="h-16 w-24 rounded object-cover"
                  />
                  <Label 
                    htmlFor="edit-imageUpload" 
                    className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Upload size={16} />
                    <span>Change image</span>
                  </Label>
                </div>
                <Input
                  id="edit-imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a high-quality image (recommended: 1200x800px)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  name="featured"
                  checked={newProject.featured}
                  onChange={handleProjectChange as any}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="edit-featured" className="text-sm font-normal">Show this project on the homepage</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateProject}>
              <Edit size={16} className="mr-2" />
              Update Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Project Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Project Preview</DialogTitle>
            <DialogDescription>
              This is how your project will appear on the website
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="py-4">
              <div className="aspect-video rounded-md bg-muted/50 overflow-hidden mb-4">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                      {selectedProject.category}
                    </span>
                    <span>•</span>
                    <span>{selectedProject.date}</span>
                    {selectedProject.featured && (
                      <>
                        <span>•</span>
                        <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-0.5 rounded text-xs">
                          Featured
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {selectedProject.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Client</p>
                    <p className="text-muted-foreground">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{selectedProject.location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button>Close Preview</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolioManager;
