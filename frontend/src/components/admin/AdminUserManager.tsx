
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
import { Search, Plus, MoreHorizontal, Edit, UserPlus, Trash, LockKeyhole, User, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dummy data - Replace with API calls to your Express backend
const DUMMY_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2023-08-15 14:32' },
  { id: '2', name: 'Editor Smith', email: 'editor@example.com', role: 'editor', status: 'active', lastLogin: '2023-08-14 09:45' },
  { id: '3', name: 'Contributor Jones', email: 'contributor@example.com', role: 'contributor', status: 'inactive', lastLogin: '2023-07-22 11:15' },
  { id: '4', name: 'Viewer Davis', email: 'viewer@example.com', role: 'viewer', status: 'active', lastLogin: '2023-08-12 16:08' },
];

const AdminUserManager = () => {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'viewer' });
  
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // POST /api/users
    
    const id = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substr(0, 5);
    
    setUsers([...users, { 
      id, 
      name: newUser.name, 
      email: newUser.email,
      role: newUser.role, 
      status: 'active',
      lastLogin: 'Never'
    }]);
    
    setNewUser({ name: '', email: '', password: '', role: 'viewer' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "User created",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleEditUser = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // PUT /api/users/:id
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "User updated",
      description: `${selectedUser.name}'s information has been updated.`,
    });
  };

  const handleDeleteUser = () => {
    // DUMMY IMPLEMENTATION - Replace with actual API call to your Express backend
    // DELETE /api/users/:id
    
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been removed.`,
    });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'contributor':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'editor':
        return <Users className="h-4 w-4" />;
      case 'contributor':
        return <UserPlus className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getRoleBadgeColor(user.role)} flex w-fit items-center gap-1`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <LockKeyhole className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-destructive focus:text-destructive"
                            disabled={user.role === 'admin'} // Prevent deleting admin users
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
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account and specify their role.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Full Name" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email"
                value={newUser.email} 
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="email@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                type="password"
                value={newUser.password} 
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="••••••••" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <select 
                id="role" 
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="viewer">Viewer</option>
                <option value="contributor">Contributor</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrator</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Administrator:</strong> Full access to all features<br />
                <strong>Editor:</strong> Can manage all content but not system settings<br />
                <strong>Contributor:</strong> Can create content but not publish<br />
                <strong>Viewer:</strong> Read-only access to the admin panel
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user account information.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
                <Input 
                  id="edit-name" 
                  value={selectedUser.name} 
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={selectedUser.email} 
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-role" className="text-sm font-medium">Role</label>
                <select 
                  id="edit-role" 
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="viewer">Viewer</option>
                  <option value="contributor">Contributor</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                <select 
                  id="edit-status" 
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account for "{selectedUser?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUserManager;
