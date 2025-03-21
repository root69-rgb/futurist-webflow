import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, LogOut, Fingerprint, Lock } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { login, checkAuth, logout, authenticateBiometric } from '@/services/authService';

// Form schema
const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const checkAdminAuth = async () => {
      const isAuthenticated = await checkAuth();
      setIsLoggedIn(isAuthenticated);
    };
    
    checkAdminAuth();
    
    // Check for lockout
    const storedLockoutUntil = localStorage.getItem("adminLockoutUntil");
    if (storedLockoutUntil) {
      const lockoutTime = parseInt(storedLockoutUntil);
      if (lockoutTime > Date.now()) {
        setLockoutUntil(lockoutTime);
        setLoginAttempts(parseInt(localStorage.getItem("adminLoginAttempts") || "0"));
      } else {
        // Lockout expired
        localStorage.removeItem("adminLockoutUntil");
        localStorage.removeItem("adminLoginAttempts");
      }
    }
    
    // Check if biometric authentication is available
    const checkBiometricSupport = async () => {
      try {
        // Check if the PublicKeyCredential API is available (WebAuthn)
        if (window.PublicKeyCredential && 
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
          const result = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setIsBiometricSupported(result);
        }
      } catch (err) {
        console.error("Error checking biometric support:", err);
        setIsBiometricSupported(false);
      }
    };
    
    checkBiometricSupport();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Check for lockout
    if (lockoutUntil && lockoutUntil > Date.now()) {
      const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60000);
      toast({
        title: "Account locked",
        description: `Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await login({ password: values.password });
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Reset login attempts on successful login
      setLoginAttempts(0);
      localStorage.removeItem("adminLoginAttempts");
      localStorage.removeItem("adminLockoutUntil");
      localStorage.setItem("adminAuth", "true"); // This will be removed when the real backend is connected
      setIsLoggedIn(true);
    } catch (error) {
      // Increment login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem("adminLoginAttempts", newAttempts.toString());
      
      // Implement lockout after 5 failed attempts
      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
        setLockoutUntil(lockoutTime);
        localStorage.setItem("adminLockoutUntil", lockoutTime.toString());
        
        toast({
          title: "Account locked",
          description: "Too many failed attempts. Try again in 15 minutes.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: `Invalid password. ${5 - newAttempts} attempts remaining.`,
          variant: "destructive",
        });
      }
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBiometricLogin = async () => {
    setIsLoading(true);
    
    try {
      const response = await authenticateBiometric();
      
      toast({
        title: "Biometric authentication successful",
        description: "Welcome to the admin dashboard",
      });
      
      localStorage.setItem("adminAuth", "true"); // This will be removed when the real backend is connected
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Biometric authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "Could not verify your identity. Please try again or use password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await logout();
      setIsLoggedIn(false);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTime = () => {
    if (!lockoutUntil) return "";
    const minutes = Math.ceil((lockoutUntil - Date.now()) / 60000);
    return `(${minutes} minute${minutes > 1 ? 's' : ''} remaining)`;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-28 pb-20">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <Card className="border border-border shadow-md">
                <CardHeader>
                  <Button 
                    variant="ghost" 
                    className="w-fit p-0 mb-4"
                    onClick={() => navigate('/')}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to website
                  </Button>
                  <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
                  <CardDescription>
                    Enter your admin password or use biometric authentication to access the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isBiometricSupported && (
                    <div className="mb-6 text-center">
                      <Button 
                        onClick={handleBiometricLogin} 
                        disabled={isLoading} 
                        className="w-full"
                      >
                        <Fingerprint className="mr-2 h-5 w-5" />
                        Authenticate with Fingerprint
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use your device's biometric authentication
                      </p>
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-9"
                                  disabled={isLoading || (lockoutUntil !== null && lockoutUntil > Date.now())}
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {lockoutUntil && lockoutUntil > Date.now() && (
                        <p className="text-destructive text-sm">
                          Account temporarily locked due to too many failed attempts. {remainingTime()}
                        </p>
                      )}
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading || (lockoutUntil !== null && lockoutUntil > Date.now())}
                      >
                        {isLoading ? "Authenticating..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground text-center">
                  For demo purposes, use password: admin123
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </div>
              <AdminDashboard />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
