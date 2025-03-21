
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Plus, Tag, FolderOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const AdminBlogManager = () => {
  const { toast } = useToast();
  
  // Demo data for blogs
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Top Security Measures for Your Home in 2023",
      excerpt: "Learn about the latest security technologies to protect your home and family.",
      content: "This is a sample blog post content. In a real implementation, this would be a full rich text article.",
      category: "Home Security",
      tags: ["Security", "Smart Home", "Technology"],
      date: "2023-06-15",
      author: "Rajesh Kumar",
      imageUrl: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Business Security Systems: A Complete Guide",
      excerpt: "Everything you need to know about securing your business premises effectively.",
      content: "This is a sample blog post content. In a real implementation, this would be a full rich text article.",
      category: "Business Security",
      tags: ["Business", "CCTV", "Access Control"],
      date: "2023-07-22",
      author: "Ananya Sharma",
      imageUrl: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Why You Need to Upgrade Your CCTV System",
      excerpt: "Modern CCTV systems offer features that older systems simply can't match.",
      content: "This is a sample blog post content. In a real implementation, this would be a full rich text article.",
      category: "Security Tech",
      tags: ["CCTV", "Technology", "Upgrades"],
      date: "2023-08-05",
      author: "Vikram Singh",
      imageUrl: "/placeholder.svg"
    }
  ]);
  
  // Demo data for categories and tags
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Home Security", slug: "home-security", description: "Articles about securing residential properties" },
    { id: "2", name: "Business Security", slug: "business-security", description: "Commercial security solutions and advice" },
    { id: "3", name: "Security Tech", slug: "security-tech", description: "The latest in security technology and innovations" }
  ]);
  
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "CCTV", slug: "cctv" },
    { id: "2", name: "Smart Home", slug: "smart-home" },
    { id: "3", name: "Access Control", slug: "access-control" },
    { id: "4", name: "Technology", slug: "technology" },
    { id: "5", name: "Security", slug: "security" },
    { id: "6", name: "Business", slug: "business" },
    { id: "7", name: "Upgrades", slug: "upgrades" }
  ]);
  
  // State for dialogs
  const [isNewBlogOpen, setIsNewBlogOpen] = useState(false);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [isNewTagOpen, setIsNewTagOpen] = useState(false);
  
  // State for form data
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    date: new Date().toISOString().split('T')[0],
    author: "",
    imageUrl: "/placeholder.svg"
  });
  
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: ""
  });
  
  const [newTag, setNewTag] = useState<Partial<Tag>>({
    name: "",
    slug: ""
  });
  
  // Handlers for blogs
  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBlog(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddBlog = () => {
    // In a real app, this would be an API call
    const id = Math.random().toString(36).substr(2, 9);
    setBlogs(prev => [...prev, { ...newBlog, id } as Blog]);
    setIsNewBlogOpen(false);
    setNewBlog({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      date: new Date().toISOString().split('T')[0],
      author: "",
      imageUrl: "/placeholder.svg"
    });
    toast({
      title: "Blog post created",
      description: "The blog post has been successfully created"
    });
  };
  
  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
    toast({
      title: "Blog post deleted",
      description: "The blog post has been successfully deleted"
    });
  };
  
  // Handlers for categories
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from name
    if (name === 'name') {
      setNewCategory(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-')
      }));
    }
  };
  
  const handleAddCategory = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setCategories(prev => [...prev, { ...newCategory, id } as Category]);
    setIsNewCategoryOpen(false);
    setNewCategory({
      name: "",
      slug: "",
      description: ""
    });
    toast({
      title: "Category created",
      description: "The category has been successfully created"
    });
  };
  
  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted"
    });
  };
  
  // Handlers for tags
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTag(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from name
    if (name === 'name') {
      setNewTag(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-')
      }));
    }
  };
  
  const handleAddTag = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setTags(prev => [...prev, { ...newTag, id } as Tag]);
    setIsNewTagOpen(false);
    setNewTag({
      name: "",
      slug: ""
    });
    toast({
      title: "Tag created",
      description: "The tag has been successfully created"
    });
  };
  
  const handleDeleteTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    toast({
      title: "Tag deleted",
      description: "The tag has been successfully deleted"
    });
  };
  
  return (
    <div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsNewBlogOpen(true)}>
              <Plus size={16} className="mr-2" />
              New Blog Post
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteBlog(blog.id)}
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
        </TabsContent>
        
        <TabsContent value="categories" className="mt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsNewCategoryOpen(true)}>
              <Plus size={16} className="mr-2" />
              New Category
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteCategory(category.id)}
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
        </TabsContent>
        
        <TabsContent value="tags" className="mt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsNewTagOpen(true)}>
              <Plus size={16} className="mr-2" />
              New Tag
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.map(tag => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium">{tag.name}</TableCell>
                    <TableCell>{tag.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteTag(tag.id)}
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
        </TabsContent>
      </Tabs>
      
      {/* New Blog Dialog */}
      <Dialog open={isNewBlogOpen} onOpenChange={setIsNewBlogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Blog Post</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new blog post
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">Author</Label>
              <Input
                id="author"
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newBlog.date}
                onChange={handleBlogChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <select
                id="category"
                name="category"
                value={newBlog.category}
                onChange={handleBlogChange as any}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="excerpt" className="text-right">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={newBlog.excerpt}
                onChange={handleBlogChange}
                className="col-span-3"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={newBlog.content}
                onChange={handleBlogChange}
                className="col-span-3"
                rows={6}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddBlog}>Create Post</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* New Category Dialog */}
      <Dialog open={isNewCategoryOpen} onOpenChange={setIsNewCategoryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for blog posts
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={newCategory.name}
                onChange={handleCategoryChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={newCategory.slug}
                onChange={handleCategoryChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newCategory.description}
                onChange={handleCategoryChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddCategory}>
              <FolderOpen size={16} className="mr-2" />
              Create Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* New Tag Dialog */}
      <Dialog open={isNewTagOpen} onOpenChange={setIsNewTagOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
            <DialogDescription>
              Create a new tag for blog posts
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={newTag.name}
                onChange={handleTagChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={newTag.slug}
                onChange={handleTagChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddTag}>
              <Tag size={16} className="mr-2" />
              Create Tag
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogManager;
