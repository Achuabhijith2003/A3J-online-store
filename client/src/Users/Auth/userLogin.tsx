import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import {TextField} from '../../components/TextField.tsx'
import {Button} from '../../components/Button.tsx'
import {Checkbox} from '../../components/Checkbox.tsx'
import { useNavigate } from 'react-router-dom';
import {loginApi} from '../../API/auth';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Connect to the backend API
      const response = await fetch('http://localhost:10000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await loginApi(email, password);

      if (!response.ok) {
        // Handle incorrect password or missing user
        setErrorMessage(data.error || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // Success! Save the token to localStorage
      console.log("Login Success!", data);
      if (data.session && data.session.access_token) {
        localStorage.setItem('token', data.session.access_token);
      }

      // Redirect the user to the admin dashboard (or storefront)
      navigate('/');

    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage('Network error. Please make sure the server is running.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col font-sans">
      
      {/* Header / Logo Area */}
      <header className="w-full flex justify-center py-4">
        <span className="text-2xl font-bold tracking-tighter text-black">
          A3J
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl w-full bg-white overflow-hidden border border-gray-200">
          
          {/* Left Side: Editorial Image */}
          <div className="hidden md:block relative h-full min-h-[600px] overflow-hidden bg-gray-200">
            <img 
              alt="Admin Environment" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-16">
              <div className="bg-white/90 backdrop-blur-sm p-6 inline-block max-w-xs">
                <p className="text-sm font-medium uppercase tracking-widest text-black mb-2">
                  Secure Access
                </p>
                <h2 className="text-4xl font-bold leading-tight text-black tracking-tight">
                  Precision in management.
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex flex-col justify-center items-center p-4 md:p-16 bg-white">
            <div className="w-full max-w-md">
              
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-black mb-2 tracking-tight">A3J</h1>
                <p className="text-base text-gray-500">
                  Please enter your credentials to access the dashboard.
                </p>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Reusable TextField Component */}
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="admin@hcm-brand.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                />

                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-5 h-5" />}
                  rightAction={
                    <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">
                      Forgot password?
                    </a>
                  }
                />

                {/* Remember Me & Security Note */}
                <div className="flex items-center justify-between py-2">
                  <Checkbox 
                    id="remember" 
                    name="remember" 
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="flex items-center gap-1 text-emerald-600">
                    <ShieldCheck className="w-4 h-4 fill-emerald-600 text-white" />
                    <span className="text-xs font-medium">Encrypted Session</span>
                  </div>
                </div>

                {/* Reusable Button Component */}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
                </Button>
              </form>

              {/* Footer Link inside Form Box */}
              <div className="mt-16 pt-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  System Status: <span className="text-emerald-600 font-medium">Operational</span>
                </p>
                <a 
                  href="/" 
                  className="text-xs text-gray-500 hover:text-black transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to Storefront
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 flex justify-center">
        <div className="max-w-7xl px-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} High-Contrast Monochrome. Internal Use Only. Authorized access monitored.
          </p>
        </div>
      </footer>
    </div>
  );
}