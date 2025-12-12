'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'E-book', href: '#ebook' },
    { name: 'Menu', href: '#toolkit' },
    { name: 'Review', href: '#review' },
    { name: 'Feedback', href: '#feedback' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-black/20 backdrop-blur-sm py-4 border-b border-white/10'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="#" className="flex items-center gap-2 sm:gap-3">
            {/* Logo */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image 
                    src="/ebook/logo.png" 
                    alt="The Right Meal Logo" 
                    fill
                    className="object-contain"
                />
            </div>
            <span className={`text-xl lugrasimo-regular sm:text-2xl font-serif font-bold whitespace-nowrap ${scrolled ? 'text-primary' : 'text-white'}`}>
                The Right Meal
            </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-medium hover:text-secondary transition-colors relative group text-sm lg:text-base whitespace-nowrap ${scrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'}`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 ${scrolled ? 'text-slate-800' : 'text-white'}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-stone-100 shadow-xl p-6 md:hidden flex flex-col gap-4">
           {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-base sm:text-lg font-medium text-slate-700 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
