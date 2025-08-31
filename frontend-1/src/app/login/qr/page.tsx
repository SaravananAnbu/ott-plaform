'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';

export default function QRLoginPage() {
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Generate QR code
  useEffect(() => {
    generateQRCode();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          generateQRCode();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQRCode = () => {
    setIsLoading(true);
    // Simulate QR code generation
    setTimeout(() => {
      const sessionId = Math.random().toString(36).substring(7);
      setQrCode(`https://streamflex.com/qr-login/${sessionId}`);
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-red-600 text-3xl font-bold">
            StreamFlex
          </Link>
        </div>
      </div>

      {/* QR Login Content */}
      <div className="relative z-10 w-full max-w-2xl p-8">
        <div className="bg-black/85 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Sign in with QR Code
            </h1>
            <p className="text-gray-400">
              Scan the QR code with your mobile device to sign in instantly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* QR Code Section */}
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl mb-6 inline-block">
                {isLoading ? (
                  <div className="w-64 h-64 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center">
                    {/* QR Code placeholder - in real app, use a QR code library */}
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="text-white">
                  <p className="text-sm text-gray-400">Expires in</p>
                  <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
                </div>
                
                <button
                  onClick={generateQRCode}
                  className="inline-flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh Code</span>
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">
                How to sign in:
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-white font-medium">Open StreamFlex app</p>
                    <p className="text-gray-400 text-sm">
                      Launch the StreamFlex mobile app on your phone or tablet
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-white font-medium">Tap "Sign in with QR"</p>
                    <p className="text-gray-400 text-sm">
                      Look for the QR code option in your account menu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-white font-medium">Scan this code</p>
                    <p className="text-gray-400 text-sm">
                      Point your camera at the QR code above
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full text-sm font-bold">
                    4
                  </div>
                  <div>
                    <p className="text-white font-medium">You're signed in!</p>
                    <p className="text-gray-400 text-sm">
                      You'll be automatically signed in on this device
                    </p>
                  </div>
                </div>
              </div>

              {/* Download App */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Smartphone className="w-6 h-6 text-red-600" />
                  <p className="text-white font-medium">Don't have the app?</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm"
                  >
                    Download for iOS
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm"
                  >
                    Download for Android
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Sign In */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Having trouble?{' '}
              <Link
                href="/login"
                className="text-red-600 hover:text-red-500 font-semibold transition-colors"
              >
                Sign in with email instead
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            🔒 QR codes are secure and expire every 5 minutes for your protection
          </p>
        </div>
      </div>
    </div>
  );
}
