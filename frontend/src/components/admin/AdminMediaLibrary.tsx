
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Upload, FolderPlus, Grid3X3, List, Trash, Copy, Edit, Download, Image, FileText, FilePlus2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy data - Replace with API calls to your Express backend
const DUMMY_MEDIA = [
  { id: '1', name: 'hero-image.jpg', type: 'image', size: '1.2 MB', url: '/placeholder.svg', uploaded: '2023-08-15', dimensions: '1920x1080' },
  { id: '2', name: 'about-team.jpg', type: 'image', size: '0.8 MB', url: '/placeholder.svg', uploaded: '2023-07-22', dimensions: '1200x800' },
  { id: '3', name: 'product-brochure.pdf', type: 'document', size: '2.5 MB', url: '#', uploaded: '2023-08-01', dimensions: '-' },
  { id: '4', name: 'portfolio-example.jpg', type: 'image', size: '1.5 MB', url: '/placeholder.svg', uploaded: '2023-08-10', dimensions: '1600x900' },
  { id: '5', name: 'company-logo.png', type: 'image', size: '0.3 MB', url: '/placeholder.svg', uploaded: '2023-08-12', dimensions: '500x500' },
  { id: '6', name: 'testimonial-video.mp4', type: 'video', size: '15.7 MB', url: '#', uploaded: '2023-08-05', dimensions: '1920x1080' },
  { id: '7', name: 'annual-report.pdf', type: 'document', size: '3.2 MB', url: '#', uploaded: '2023-06-18', dimensions: '-' },
];

const AdminMediaLibrary = () => {
  const [media, setMedia] = useState(DUMMY_MEDIA);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const { toast } = useToast();

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // POST /api/media/upload
    
    // Simulate upload progress
    let progress = 0;
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Add dummy file after upload completes
        const newFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: `new-upload-${Date.now()}.jpg`,
          type: 'image',
          size: '1.1 MB',
          url: '/placeholder.svg',
          uploaded: new Date().toISOString().split('T')[0],
          dimensions: '1800x1200'
        };
        
        setMedia([newFile, ...media]);
        setUploadProgress(null);
        
        toast({
          title: "Upload complete",
          description: `${newFile.name} has been uploaded successfully.`,
        });
      }
    }, 100);
  };

  const handleItemClick = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteSelected = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // DELETE /api/media
    
    setMedia(media.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    
    toast({
      title: "Files deleted",
      description: `${selectedItems.length} item(s) have been deleted.`,
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <FilePlus2 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-muted' : ''}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-muted' : ''}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
            <Button onClick={handleFileUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
        
        {uploadProgress !== null && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}
        
        {selectedItems.length > 0 && (
          <div className="flex items-center justify-between bg-muted p-2 rounded-md mb-4">
            <span className="text-sm">{selectedItems.length} item(s) selected</span>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDeleteSelected}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}
        
        <TabsContent value="all">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-md overflow-hidden cursor-pointer group transition-all duration-200 ${
                    selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.type === 'image' ? (
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
                        selectedItems.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                      }`}>
                        <div className="flex gap-1">
                          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/20" onClick={(e) => e.stopPropagation()}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/20" onClick={(e) => e.stopPropagation()}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      {getFileIcon(item.type)}
                    </div>
                  )}
                  <div className="p-2 bg-card">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Type</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Size</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Dimensions</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Uploaded</th>
                    <th className="text-right py-2 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`border-b hover:bg-muted/50 cursor-pointer ${
                        selectedItems.includes(item.id) ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          {getFileIcon(item.type)}
                          <span className="ml-2 text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-sm">{item.type}</td>
                      <td className="py-2 px-4 text-sm">{item.size}</td>
                      <td className="py-2 px-4 text-sm">{item.dimensions}</td>
                      <td className="py-2 px-4 text-sm">{item.uploaded}</td>
                      <td className="py-2 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="images">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.filter(item => item.type === 'image').map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-md overflow-hidden cursor-pointer group transition-all duration-200 ${
                    selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
                      selectedItems.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                    }`}>
                      <div className="flex gap-1">
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-white/20" onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-white/20" onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-card">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Size</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Dimensions</th>
                    <th className="text-left py-2 px-4 font-medium text-sm">Uploaded</th>
                    <th className="text-right py-2 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.filter(item => item.type === 'image').map((item) => (
                    <tr 
                      key={item.id} 
                      className={`border-b hover:bg-muted/50 cursor-pointer ${
                        selectedItems.includes(item.id) ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          <Image className="h-5 w-5" />
                          <span className="ml-2 text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-sm">{item.size}</td>
                      <td className="py-2 px-4 text-sm">{item.dimensions}</td>
                      <td className="py-2 px-4 text-sm">{item.uploaded}</td>
                      <td className="py-2 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        {/* Similar TabsContent for documents and videos */}
        <TabsContent value="documents">
          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-2 px-4 font-medium text-sm">Name</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Size</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Uploaded</th>
                  <th className="text-right py-2 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.filter(item => item.type === 'document').map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b hover:bg-muted/50 cursor-pointer ${
                      selectedItems.includes(item.id) ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5" />
                        <span className="ml-2 text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.size}</td>
                    <td className="py-2 px-4 text-sm">{item.uploaded}</td>
                    <td className="py-2 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-2 px-4 font-medium text-sm">Name</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Size</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Dimensions</th>
                  <th className="text-left py-2 px-4 font-medium text-sm">Uploaded</th>
                  <th className="text-right py-2 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.filter(item => item.type === 'video').map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b hover:bg-muted/50 cursor-pointer ${
                      selectedItems.includes(item.id) ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <FilePlus2 className="h-5 w-5" />
                        <span className="ml-2 text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.size}</td>
                    <td className="py-2 px-4 text-sm">{item.dimensions}</td>
                    <td className="py-2 px-4 text-sm">{item.uploaded}</td>
                    <td className="py-2 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMediaLibrary;
