"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo size={32} priority={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Features
            </button>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Pricing
            </Link>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signin"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-primary"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-text-secondary hover:text-primary transition-colors font-medium py-2"
              >
                Features
              </button>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-text-secondary hover:text-primary transition-colors font-medium py-2"
              >
                Pricing
              </Link>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-text-secondary hover:text-primary transition-colors font-medium py-2"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left text-text-secondary hover:text-primary transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <hr className="border-border" />
              <Link
                href="/auth/signin"
                className="block text-text-secondary hover:text-primary transition-colors font-medium py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signin"
                className="block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium text-center transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
