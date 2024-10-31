"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import content from "../content.json";
import navLinks from "../navLinks.json";

const joinLink = content.components.hero.buttonLink;
const navItems = navLinks.nav.navItems;
const socialLinks = navLinks.nav.socialLinks;

// Find the index of the item with label "Join"
const joinIndex = navItems.findIndex((item) => item.label === "Join");

// Set href to joinLink if "Join" item exists
if (joinIndex !== -1) {
  navItems[joinIndex]!.href = joinLink;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <motion.div
          initial={{ x: 75, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="Brand"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </motion.div>
        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-4 uppercase md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className={item.className}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="hidden lg:flex lg:items-center">
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 top-full bg-black bg-opacity-90 shadow-lg md:hidden"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} className={`${item.className} my-1`} onClick={toggleMenu}>
                {item.label}
              </NavLink>
            ))}
            <div className="mt-4 flex items-center space-x-4">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  className = "border-white text-white hover:border-gray-400 hover:text-gray-400",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`border-b-2 border-t-2 py-2 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link href={href} aria-label={label} className="px-1">
      <div className="h-10 w-10 overflow-hidden rounded-full hover:scale-105">
        <Image
          src={icon}
          alt={label}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    </Link>
  );
}
