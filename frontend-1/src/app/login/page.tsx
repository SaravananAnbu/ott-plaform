'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Chrome } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login:', { email, password, rememberMe });
      // Redirect to home page
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-red-600 text-3xl font-bold">
            StreamFlex
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-12 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-12 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-700 bg-gray-800 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>
              
              <Link
                href="/forgot-password"
                className="text-red-600 text-sm hover:text-red-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform",
                isLoading 
                  ? "opacity-75 cursor-not-allowed" 
                  : "hover:bg-red-700 hover:scale-105 active:scale-95"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/80 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <Link
                href="/login/qr"
                className="block w-full text-center bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 border border-gray-700"
              >
                Sign in with QR Code
              </Link>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              New to StreamFlex?{' '}
              <Link
                href="/signup"
                className="text-red-600 hover:text-red-500 font-semibold transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm text-center mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
}
