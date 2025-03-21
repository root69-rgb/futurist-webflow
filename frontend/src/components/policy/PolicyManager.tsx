
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PolicyDialog from './PolicyDialog';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookiePolicy from './CookiePolicy';

export type PolicyType = 'privacy' | 'terms' | 'cookies';

interface PolicyManagerProps {
  open: PolicyType | null;
  onClose: () => void;
  initialPolicy?: PolicyType | null;
}

const PolicyManager: React.FC<PolicyManagerProps> = ({ open, onClose, initialPolicy = null }) => {
  const location = useLocation();
  const [currentPolicy, setCurrentPolicy] = useState<PolicyType | null>(open || initialPolicy);
  
  useEffect(() => {
    // Handle policy from route state (e.g., from redirects)
    if (location.state && location.state.openPolicy) {
      setCurrentPolicy(location.state.openPolicy);
      // Clear the state to prevent reopening
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    // Update current policy when open prop changes
    setCurrentPolicy(open);
  }, [open]);

  const handleClose = () => {
    setCurrentPolicy(null);
    onClose();
  };

  return (
    <>
      <PolicyDialog
        isOpen={currentPolicy === 'privacy'}
        onClose={handleClose}
        title="Privacy Policy"
        description="How we collect, use, and protect your information"
        content={<PrivacyPolicy />}
      />
      
      <PolicyDialog
        isOpen={currentPolicy === 'terms'}
        onClose={handleClose}
        title="Terms of Service"
        description="Rules and guidelines for using our website and services"
        content={<TermsOfService />}
      />
      
      <PolicyDialog
        isOpen={currentPolicy === 'cookies'}
        onClose={handleClose}
        title="Cookie Policy"
        description="How we use cookies and similar technologies"
        content={<CookiePolicy />}
      />
    </>
  );
};

export default PolicyManager;
