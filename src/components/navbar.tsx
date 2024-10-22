import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="Brand"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <nav className="hidden items-center space-x-4 md:flex">
          <NavLink href="/" className="text-white border-white hover:text-gray-400 hover:border-gray-400">HOME</NavLink>
          <NavLink href="/about" className="text-white border-white hover:text-gray-400 hover:border-gray-400">ABOUT</NavLink>
          <NavLink href="/calendar" className="text-white border-white hover:text-gray-400 hover:border-gray-400">CALENDAR</NavLink>
          <NavLink href="/tornument" className="text-white border-white hover:text-gray-400 hover:border-gray-400">Tournament Info</NavLink>
          <NavLink href="/board" className="text-white border-white hover:text-gray-400 hover:border-gray-400">2024-2025 BOARD</NavLink>
          <NavLink href="/merch" className="text-white border-white hover:text-gray-400 hover:border-gray-400">MERCH</NavLink>
          <NavLink href="/join" className="text-yellow-400 border-yellow-400 hover:text-yellow-500 hover:border-yellow-500">JOIN</NavLink>
          <div className="hidden lg:flex lg:items-center">
          <SocialIcon href="https://instagram.com" icon="/Icons/Instagram.webp" label="Instagram" />
          <SocialIcon href="https://discord.com" icon="/Icons/Discord.webp" label="Discord" />
          <SocialIcon href="https://www.tabroom.com/index/index.mhtml" icon="/Icons/Tabroom.webp" label="Tabroom" />
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string} ){
  return (
    <Link href={href} className={`border-t-2 border-b-2 py-2 transition-colors ${className}`}>
      {children}
    </Link>
  )
}



function SocialIcon({ href, label, icon}: { href: string; label: string, icon: string }) {
  return (
    <Link href={href} aria-label={label} className="px-1">
      <div className="w-10 h-10 rounded-full overflow-hidden">
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