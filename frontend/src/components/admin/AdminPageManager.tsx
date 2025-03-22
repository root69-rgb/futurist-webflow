
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, MoreHorizontal, ExternalLink, Edit, Trash, FileSymlink, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy data - Replace with API calls to your Express backend
const DUMMY_PAGES = [
  { id: '1', title: 'Home', slug: '/', status: 'published', lastModified: '2023-08-15' },
  { id: '2', title: 'About Us', slug: '/about', status: 'published', lastModified: '2023-07-22' },
  { id: '3', title: 'Services', slug: '/services', status: 'published', lastModified: '2023-08-01' },
  { id: '4', title: 'Portfolio', slug: '/portfolio', status: 'published', lastModified: '2023-08-10' },
  { id: '5', title: 'Blog', slug: '/blog', status: 'published', lastModified: '2023-08-12' },
  { id: '6', title: 'Contact', slug: '/contact', status: 'published', lastModified: '2023-08-05' },
  { id: '7', title: 'Privacy Policy', slug: '/privacy', status: 'published', lastModified: '2023-06-18' },
];

const AdminPageManager = () => {
  const [pages, setPages] = useState(DUMMY_PAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [newPage, setNewPage] = useState({ title: '', slug: '', status: 'draft' });
  
  const { toast } = useToast();

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPage = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // POST /api/pages

    const id = Math.random().toString(36).substr(2, 9);
    const today = new Date().toISOString().split('T')[0];
    
    setPages([...pages, { 
      id, 
      title: newPage.title, 
      slug: newPage.slug || `/${newPage.title.toLowerCase().replace(/\s+/g, '-')}`,
      status: newPage.status, 
      lastModified: today
    }]);
    
    setNewPage({ title: '', slug: '', status: 'draft' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Page created",
      description: `${newPage.title} has been created successfully.`,
    });
  };

  const handleEditPage = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/pages/:id

    const updatedPages = pages.map(page => 
      page.id === selectedPage.id ? selectedPage : page
    );
    
    setPages(updatedPages);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Page updated",
      description: `${selectedPage.title} has been updated successfully.`,
    });
  };

  const handleDeletePage = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // DELETE /api/pages/:id

    setPages(pages.filter(page => page.id !== selectedPage.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Page deleted",
      description: `${selectedPage.title} has been deleted successfully.`,
    });
  };

  const handlePageView = (slug: string) => {
    window.open(slug, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Page
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">{page.slug}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={() => handlePageView(page.slug)}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {page.status}
                    </span>
                  </TableCell>
                  <TableCell>{page.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePageView(page.slug)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedPage(page);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPage(page);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No pages found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Page Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Page</DialogTitle>
            <DialogDescription>Create a new page for your website.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                value={newPage.title} 
                onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                placeholder="Page Title" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">Slug</label>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-1">/</span>
                <Input 
                  id="slug" 
                  value={newPage.slug.replace(/^\//, '')} 
                  onChange={(e) => setNewPage({...newPage, slug: `/${e.target.value}`})}
                  placeholder="page-url-slug" 
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave empty to auto-generate from title
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <select 
                id="status" 
                value={newPage.status}
                onChange={(e) => setNewPage({...newPage, status: e.target.value})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPage}>Create Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Page Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Update page information.</DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                <Input 
                  id="edit-title" 
                  value={selectedPage.title} 
                  onChange={(e) => setSelectedPage({...selectedPage, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-slug" className="text-sm font-medium">Slug</label>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-1">/</span>
                  <Input 
                    id="edit-slug" 
                    value={selectedPage.slug.replace(/^\//, '')} 
                    onChange={(e) => setSelectedPage({...selectedPage, slug: `/${e.target.value}`})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                <select 
                  id="edit-status" 
                  value={selectedPage.status}
                  onChange={(e) => setSelectedPage({...selectedPage, status: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditPage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the page "{selectedPage?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPageManager;
