
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PolicyManager, { PolicyType } from './PolicyManager';

const PolicyLinks = () => {
  const [openPolicy, setOpenPolicy] = useState<PolicyType | null>(null);

  const handleOpenPolicy = (type: PolicyType) => {
    setOpenPolicy(type);
  };

  const handleClosePolicy = () => {
    setOpenPolicy(null);
  };

  return (
    <>
      <Button 
        variant="link" 
        className="p-0 h-auto text-sm font-normal text-muted-foreground hover:text-foreground"
        onClick={() => handleOpenPolicy('privacy')}
      >
        Privacy Policy
      </Button>
      <Button 
        variant="link" 
        className="p-0 h-auto text-sm font-normal text-muted-foreground hover:text-foreground"
        onClick={() => handleOpenPolicy('terms')}
      >
        Terms of Service
      </Button>
      <Button 
        variant="link" 
        className="p-0 h-auto text-sm font-normal text-muted-foreground hover:text-foreground"
        onClick={() => handleOpenPolicy('cookies')}
      >
        Cookie Policy
      </Button>
      
      <PolicyManager 
        open={openPolicy}
        onClose={handleClosePolicy}
      />
    </>
  );
};

export default PolicyLinks;
