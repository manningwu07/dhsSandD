import Link from "next/link";
import { SocialIcon } from "./navbar";

export default function Footer() {
  return (
    <footer className="py-8 text-white">
      <div className="container mx-auto px-8">
        <div className="grid w-full grid-cols-3 items-start">
          <div className="text-left md:ml-8 lg:ml-12">
            <h3 className="mb-2 font-bold">Students</h3>
            <div className="flex flex-col space-y-1">
              <Link className="hover:underline" href="/sign-ups">
                Sign ups
              </Link>
              <Link className="hover:underline" href="/schedule">
                Schedule
              </Link>
              <Link className="hover:underline" href="/tab-room">
                Tab room
              </Link>
              <Link className="hover:underline" href="/results">
                Results
              </Link>
              <Link className="hover:underline" href="/nsda">
                NSDA
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-2 font-bold">Contact</h3>
            <div className="flex">
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
              <SocialIcon
                href="mailto:dublinhighspeechanddebate@gmail.com"
                icon="/Icons/Email.png"
                label="Email"
              />
            </div>
          </div>

          <div className="flex justify-end text-left md:mr-8 lg:mr-12">
            <div>
              <h3 className="mb-2 font-bold">Parents</h3>
              <ul className="space-y-1">
                <li>
                  <Link className="hover:underline" href="/register-judge">
                    Register as judge
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/parent-judge-info">
                    Parent judge info
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/volunteer">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/nsda">
                    NSDA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t-2 border-gray-700 pt-8 md:flex-row">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          <p>Created by Manning Wu (Class of 2025)</p>
        </div>
      </div>
    </footer>
  );
}
