import Image from 'next/image';
import Link from 'next/link';
import ApplePodcastButton from '../buttons/apple-podcast-button';

interface SpotifyPodcastCardProps {
  title: string;
  imageUrl: string;
  spotifyLink?: string;
  applePodcastLink?: string;
  buttonType: 'spotify' | 'apple';
}

export default function SpotifyPodcastCard({
  title,
  imageUrl,
  spotifyLink,
  applePodcastLink,
  buttonType,
}: SpotifyPodcastCardProps) {
  return (
    <div className="flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="text-sm font-semibold text-neutral-heading text-center mb-2">{title}</h3>
      {buttonType === 'spotify' && spotifyLink && (
        <Link
          href={spotifyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-green-500 text-black font-bold py-1 px-2 rounded hover:bg-green-400 transition-colors"
        >
          Listen on Spotify
        </Link>
      )}
      {buttonType === 'apple' && applePodcastLink && (
        <ApplePodcastButton applePodcastLink={applePodcastLink} />
      )}
    </div>
  );
}
