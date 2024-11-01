import Image from "next/image";
import Link from "next/link";

export default function LandingCard({
  src,
  alt,
  header,
  description,
  link,
}: {
  src: string;
  alt: string;
  header: string;
  description: string;
  link: string;
}) {
  return (
    <div className="border-black relative flex flex-col rounded-xl border shadow-lg">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={600}
        height={500}
        className="rounded-lg p-2 shadow-lg"
      />
      <div className="px-2 text-xl lg:py-1 2xl:py-2 font-bold">{header}</div>
      <div className="p-2">{description}</div>
      <Link href={link} className="flex justify-center pb-2">
        <div className="bg-blue rounded-xl px-4 py-3 text-center hover:underline">
          Learn More
        </div>
      </Link>
    </div>
  );
}
