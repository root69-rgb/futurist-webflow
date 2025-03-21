
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trash, 
  Mail, 
  Clock, 
  MessageSquare, 
  User, 
  CheckCircle2,
  ArchiveIcon,
  Inbox,
  Loader2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  getMessages, 
  markMessageAsRead, 
  archiveMessage as archiveMessageApi, 
  restoreMessage as restoreMessageApi, 
  deleteMessage as deleteMessageApi,
  Message
} from '@/services/messageService';

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<null | Message>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // Load messages on component mount
  useEffect(() => {
    loadMessages();
  }, []);
  
  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter messages based on search term
  const filteredMessages = messages.filter(
    msg => 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get messages for each tab
  const inboxMessages = filteredMessages.filter(msg => !msg.archived);
  const archivedMessages = filteredMessages.filter(msg => msg.archived);
  const unreadCount = messages.filter(msg => !msg.read && !msg.archived).length;
  
  // Mark a message as read
  const markAsRead = async (id: number) => {
    if (messages.find(m => m.id === id)?.read) return;
    
    setActionLoading(id);
    try {
      await markMessageAsRead(id);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };
  
  // Archive a message
  const archiveMessage = async (id: number) => {
    setActionLoading(id);
    try {
      await archiveMessageApi(id);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, archived: true } : msg
        )
      );
      
      toast({
        title: "Message archived",
        description: "The message has been moved to the archive"
      });
    } catch (error) {
      console.error('Failed to archive message:', error);
      toast({
        title: "Error",
        description: "Failed to archive message",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };
  
  // Restore a message from archive
  const restoreMessage = async (id: number) => {
    setActionLoading(id);
    try {
      await restoreMessageApi(id);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, archived: false } : msg
        )
      );
      
      toast({
        title: "Message restored",
        description: "The message has been restored to the inbox"
      });
    } catch (error) {
      console.error('Failed to restore message:', error);
      toast({
        title: "Error",
        description: "Failed to restore message",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };
  
  // Delete a message
  const deleteMessage = async (id: number) => {
    setActionLoading(id);
    try {
      await deleteMessageApi(id);
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
      
      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted"
      });
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };
  
  // View message details
  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    setViewDialogOpen(true);
    
    // Mark as read if not already read
    if (!message.read) {
      markAsRead(message.id);
    }
  };
  
  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const MessageCard = ({ message, archived = false }: { message: Message, archived?: boolean }) => (
    <Card key={message.id} className={`mb-4 border ${!message.read && !archived ? 'bg-primary/5' : 'bg-card'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{message.subject}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <User className="mr-1 h-3 w-3" /> 
              {message.name} 
              <span className="mx-1">•</span> 
              <Mail className="mr-1 h-3 w-3" /> 
              {message.email}
            </CardDescription>
          </div>
          {!message.read && !archived && (
            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
              New
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {message.message}
        </p>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <Clock className="mr-1 h-3 w-3" /> 
          {formatDate(message.date)}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => viewMessage(message)}
          disabled={actionLoading === message.id}
        >
          <MessageSquare className="mr-1 h-4 w-4" /> 
          View
        </Button>
        <div className="flex space-x-2">
          {actionLoading === message.id ? (
            <Button variant="outline" size="sm" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : archived ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => restoreMessage(message.id)}
            >
              <Inbox className="mr-1 h-4 w-4" /> 
              Restore
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => archiveMessage(message.id)}
            >
              <ArchiveIcon className="mr-1 h-4 w-4" /> 
              Archive
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="text-destructive hover:text-destructive"
            onClick={() => deleteMessage(message.id)}
            disabled={actionLoading === message.id}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Contact Messages</h3>
          {unreadCount > 0 && (
            <Badge className="bg-primary">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="w-64">
          <Input 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="inbox">
          <TabsList className="mb-4">
            <TabsTrigger value="inbox" className="relative">
              Inbox
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="archived">
              Archived ({archivedMessages.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbox">
            {inboxMessages.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-6 text-center border-dashed">
                <Mail className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No Messages</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "No messages match your search term" : "Your inbox is empty"}
                </p>
              </Card>
            ) : (
              inboxMessages.map(message => (
                <MessageCard key={message.id} message={message} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="archived">
            {archivedMessages.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-6 text-center border-dashed">
                <ArchiveIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No Archived Messages</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "No archived messages match your search term" : "Your archive is empty"}
                </p>
              </Card>
            ) : (
              archivedMessages.map(message => (
                <MessageCard key={message.id} message={message} archived={true} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {/* Message View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription className="flex flex-col text-sm">
                <span><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</span>
                <span><strong>Date:</strong> {formatDate(selectedMessage.date)}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 border-y text-sm">
              <p className="whitespace-pre-line">{selectedMessage.message}</p>
            </div>
            <DialogFooter className="flex justify-between items-center sm:justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="text-primary h-4 w-4" />
                <span className="text-xs text-muted-foreground">Marked as read</span>
              </div>
              <div className="flex space-x-2">
                {actionLoading === selectedMessage.id ? (
                  <Button variant="outline" size="sm" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </Button>
                ) : !selectedMessage.archived ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      archiveMessage(selectedMessage.id);
                      setViewDialogOpen(false);
                    }}
                  >
                    <ArchiveIcon className="mr-1 h-4 w-4" /> 
                    Archive
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      restoreMessage(selectedMessage.id);
                      setViewDialogOpen(false);
                    }}
                  >
                    <Inbox className="mr-1 h-4 w-4" /> 
                    Restore
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setViewDialogOpen(false);
                  }}
                  disabled={actionLoading === selectedMessage.id}
                >
                  <Trash className="mr-1 h-4 w-4" /> 
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminMessages;
