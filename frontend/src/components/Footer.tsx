import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Device Support', href: '/devices' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Content Guidelines', href: '/guidelines' },
    ],
    'Connect': [
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Investor Relations', href: '/investors' },
      { name: 'Corporate Info', href: '/corporate' },
      { name: 'Partnerships', href: '/partners' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-black text-gray-300 mt-20 font-ubuntu">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon className="w-6 h-6" />
              <span className="sr-only">{social.name}</span>
            </Link>
          ))}
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-ubuntu font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors font-ubuntu"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Logo and Description */}
            <div>
              <Link href="/" className="text-red-600 text-2xl font-bold mb-2 block">
                StreamFlex
              </Link>
              <p className="text-sm text-gray-400 max-w-md">
                Watch unlimited movies, TV shows and original content on StreamFlex. 
                Stream anytime, anywhere on any device.
              </p>
            </div>

            {/* Language and Region */}
            <div className="flex flex-col space-y-2">
              <select className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
                <option>हिन्दी</option>
                <option>தமிழ்</option>
              </select>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              © 2024 StreamFlex, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
