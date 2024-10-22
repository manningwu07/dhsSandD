"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {

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
        <nav className="hidden items-center space-x-4 md:flex">
          <NavLink
            href="/"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            HOME
          </NavLink>
          <NavLink
            href="/about"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            ABOUT
          </NavLink>
          <NavLink
            href="/calendar"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            CALENDAR
          </NavLink>
          <NavLink
            href="/tornument"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            TOURNUMENT INFO
          </NavLink>
          <NavLink
            href="/board"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            2024-2025 BOARD
          </NavLink>
          <NavLink
            href="/merch"
            className="border-white text-white hover:border-gray-400 hover:text-gray-400"
          >
            MERCH
          </NavLink>
          <NavLink
            href="/join"
            className="border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:text-yellow-500"
          >
            JOIN
          </NavLink>
          <div className="hidden lg:flex lg:items-center">
            <SocialIcon
              href="https://instagram.com"
              icon="/Icons/Instagram.webp"
              label="Instagram"
            />
            <SocialIcon
              href="https://discord.com"
              icon="/Icons/Discord.webp"
              label="Discord"
            />
            <SocialIcon
              href="https://www.tabroom.com/index/index.mhtml"
              icon="/Icons/Tabroom.webp"
              label="Tabroom"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`border-b-2 border-t-2 py-2 transition-colors ${className}`}
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
