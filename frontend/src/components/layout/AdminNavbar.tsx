
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface AdminNavbarProps {
  onLogout: () => void;
  isLoading: boolean;
}

const AdminNavbar = ({ onLogout, isLoading }: AdminNavbarProps) => {
  return (
    <nav className="bg-white dark:bg-tech-dark border-b py-3 px-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple">
          ViewTech Admin
        </span>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <a href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Website
            </a>
          </Button>
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLogout} 
            disabled={isLoading}
          >
            <LogOut className="mr-1 h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
