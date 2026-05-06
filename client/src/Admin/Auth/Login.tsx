import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {TextField} from '../../components/TextField.tsx';
import {Checkbox} from '../../components//Checkbox';
import {Button} from '../../components/Button.tsx';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password, rememberMe });
    // Simulate successful login routing
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white overflow-hidden border border-gray-200">
        
        {/* Left Side: Editorial Image */}
        <div className="hidden md:block relative h-full min-h-[600px] overflow-hidden bg-gray-200">
          <img 
            alt="Admin Environment" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105" 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-12">
            <div className="bg-white/90 backdrop-blur-sm p-6 inline-block max-w-xs rounded-sm">
              <p className="text-sm font-medium uppercase tracking-widest text-black mb-2">
                Secure Access
              </p>
              <h2 className="text-3xl font-bold leading-tight text-black tracking-tight">
                Precision in management.
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-white">
          <div className="w-full max-w-md">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2 tracking-tight">Admin Portal</h1>
              <p className="text-base text-gray-500">
                Please enter your credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                  <Link to="#" className="text-xs text-gray-500 hover:text-black transition-colors">
                    Forgot password?
                  </Link>
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

              <Button type="submit">
                Login to Dashboard
              </Button>
            </form>

            {/* Footer Link inside Form Box */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                System Status: <span className="text-emerald-600 font-medium">Operational</span>
              </p>
              <Link 
                to="/" 
                className="text-xs text-gray-500 hover:text-black transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Storefront
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}