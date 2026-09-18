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
    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xs rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative w-14 h-14 shrink-0">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover rounded-sm"
          sizes="56px"
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-neutral-heading mb-2">{title}</h3>
        {buttonType === 'spotify' && spotifyLink && (
          <Link
            href={spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs bg-green-500 text-black font-bold py-1 px-2 rounded hover:bg-green-400 transition-colors"
          >
            Listen on Spotify
          </Link>
        )}
        {buttonType === 'apple' && applePodcastLink && (
          <ApplePodcastButton applePodcastLink={applePodcastLink} />
        )}
      </div>
    </div>
  );
}
