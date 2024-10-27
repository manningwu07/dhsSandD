import Image from "next/image";

interface LeadershipCardProps {
  imageSrc: string;
  name: string;
  position: string;
  department: string;
}

export default function LeadershipCard({
  imageSrc,
  name,
  position,
  department,
}: LeadershipCardProps) {
  return (
    <div className="group relative h-[400px] w-full max-w-[500px]">
      <div className="absolute left-0 top-0 z-10 h-full w-11/12">
        <Image
          src={imageSrc}
          alt={`${name} - ${position}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="z-20 absolute bottom-4 right-0 w-2/3 bg-white bg-opacity-90 p-3 shadow-[8px_8px_0_0_rgba(156,163,175,1)]"> 
        <h2 className="text-lg font-bold leading-tight text-gray-800">
          {name}
        </h2>
        <p className="text-sm font-medium leading-snug text-gray-600">
          {position}
        </p>
        <p className="text-sm font-medium leading-snug text-gray-600">
          {department}
        </p>
      </div>
    </div>
  );
}
