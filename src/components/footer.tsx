import Link from 'next/link';
import { SocialIcon } from './navbar';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-3 w-full items-start">
          <div className="text-left md:ml-8 lg:ml-12">
            <h3 className="font-bold mb-2">Students</h3>
            <div className="flex flex-col space-y-1">
              <Link className="hover:underline" href="/sign-ups">Sign ups</Link>
              <Link className="hover:underline" href="/schedule">Schedule</Link>
              <Link className="hover:underline" href="/tab-room">Tab room</Link>
              <Link className="hover:underline" href="/results">Results</Link>
              <Link className="hover:underline" href="/nsda">NSDA</Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            
              <h3 className="font-bold mb-2">Contact</h3>
              <div className="flex">
                <SocialIcon href="https://instagram.com" icon="/Icons/Instagram.webp" label="Instagram" />
                <SocialIcon href="https://discord.com" icon="/Icons/Discord.webp" label="Discord" />
                <SocialIcon href="https://www.tabroom.com/index/index.mhtml" icon="/Icons/Tabroom.webp" label="Tabroom" />
                <SocialIcon href="mailto:dublinhighspeechanddebate@gmail.com" icon="/Icons/Email.png" label="Email" />
              </div>
            
          </div>

          <div className="text-left flex justify-end md:mr-8 lg:mr-12">
            <div>
              <h3 className="font-bold mb-2">Parents</h3>
              <ul className="space-y-1">
                <li><Link className="hover:underline" href="/register-judge">Register as judge</Link></li>
                <li><Link className="hover:underline" href="/parent-judge-info">Parent judge info</Link></li>
                <li><Link className="hover:underline" href="/volunteer">Volunteer</Link></li>
                <li><Link className="hover:underline" href="/nsda">NSDA</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          <p>Created by Manning Wu (Class of 2025)</p>
        </div>
      </div>
    </footer>
  );
}
