import Link from "next/link";
import { SocialIcon } from "./navbar";
import navLinks from "../navLinks.json";
import { useRouter } from "next/router";
import { signInWithGoogle } from "~/lib/auth";

const studentLinks = navLinks.footer.studentLinks;
const parentLinks = navLinks.footer.parentLinks;
const socialIcons = navLinks.footer.socialIcons;

export default function Footer() {
  const router = useRouter();
  
  const SignInLink = () => {
    return (
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleSignInAndRedirect();
        }}
      >
        &nbsp;Manning Wu&nbsp;
      </Link>
    );
  };

  const handleSignInAndRedirect = () => {
    signInWithGoogle().then((userCredential) => {
      if (userCredential) {
        void router.push("/admin") // Redirect to /admin
      } else {
        void router.push("/")
      }
    }).catch(() => {
      void router.push("/");
    });
  };

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
            Created by <SignInLink /> (Class of 2025)
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
