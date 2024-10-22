import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-8">
        {/* Full-width grid with evenly distributed columns */}
        <div className="grid grid-cols-3 w-full items-start">
          {/* Left Section */}
          <div className="text-left">
            <h3 className="font-bold mb-2">Students</h3>
            <ul className="space-y-1">
              <li><Link href="/sign-ups">Sign ups</Link></li>
              <li><Link href="/schedule">Schedule</Link></li>
              <li><Link href="/tab-room">Tab room</Link></li>
              <li><Link href="/results">Results</Link></li>
              <li><Link href="/nsda">NSDA</Link></li>
            </ul>
          </div>

          {/* Center Section */}
          <div className="flex justify-center">
            <div className="text-center">
              <h3 className="font-bold mb-2">Contact</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-left flex justify-end">
            <div>
              <h3 className="font-bold mb-2">Parents</h3>
              <ul className="space-y-1">
                <li><Link href="/register-judge">Register as judge</Link></li>
                <li><Link href="/parent-judge-info">Parent judge info</Link></li>
                <li><Link href="/volunteer">Volunteer</Link></li>
                <li><Link href="/nsda">NSDA</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          <p>Created by Manning Wu (Class of 2025)</p>
        </div>
      </div>
    </footer>
  );
}
