import Link from "next/link";
import { SocialIcon } from "./navbar";

// Need link for tournament results

const studentLinks = [
  { href: "/tournament", label: "Sign ups" },
  { href: "/calendar", label: "Club Schedule" },
  { href: "/https://www.tabroom.com/index/index.mhtml", label: "Tab room" },
  { href: "/results", label: "Tournament Results" },
  { href: "/https://www.speechanddebate.org/", label: "NSDA" },
];

// Need link for judge resgisteration

const parentLinks = [
  { href: "/register-judge", label: "Register as judge" },
  { href: "/parents", label: "Parent judge info" },
  { href: "/parents", label: "Volunteer" },
  { href: "/https://www.speechanddebate.org/", label: "NSDA" },
];

const socialIcons = [
  {
    href: "https://instagram.com",
    icon: "/Icons/Instagram.webp",
    label: "Instagram",
  },
  {
    href: "https://discord.com",
    icon: "/Icons/Discord.webp",
    label: "Discord",
  },
  {
    href: "https://www.tabroom.com/index/index.mhtml",
    icon: "/Icons/Tabroom.webp",
    label: "Tabroom",
  },
  {
    href: "mailto:dublinhighspeechanddebate@gmail.com",
    icon: "/Icons/Email.png",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="py-8 text-white">
      <div className="container mx-auto px-8">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row sm:items-start">
          <Section title="Students" links={studentLinks} />

          <div className="mb-5 flex flex-col items-center justify-center sm:mb-0">
            <h3 className="mb-2 font-bold">Contact</h3>
            <div className="flex">
              {socialIcons.map(({ href, icon, label }) => (
                <SocialIcon key={label} href={href} icon={icon} label={label} />
              ))}
            </div>
          </div>

          <Section title="Parents" links={parentLinks} />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t-2 border-gray-700 pt-8 md:flex-row">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          <p className="flex">
            Created by <Link href="/admin">&nbsp;Manning Wu&nbsp;</Link> (Class of 2025)
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable Section Component for Students and Parents
const Section = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => (
  <div className="mb-5 text-left sm:mb-0 md:ml-8 lg:ml-12">
    <h3 className="mb-2 font-bold">{title}</h3>
    <ul className="flex flex-col space-y-1 text-center sm:text-left">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link className="hover:underline" href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
