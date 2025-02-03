import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface YouTubeCardProps {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  videoLink: string;
}

export default function YouTubeCard({
  title,
  channelName,
  thumbnailUrl,
  videoLink,
}: YouTubeCardProps) {
  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          width={320}
          height={180}
          className="w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-2">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-neutral-heading mb-1">
          {title}
        </h3>
        <p className="text-xs text-neutral-accent mb-2">{channelName}</p>
        <Link
          href={videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-red-600 text-white font-bold py-1 px-2 rounded hover:bg-red-500 transition-colors"
        >
          Watch on YouTube
        </Link>
      </div>
    </div>
  );
}
