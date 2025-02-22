import Link from 'next/link';

interface ApplePodcastButtonProps {
  applePodcastLink: string;
}

export default function ApplePodcastButton({ applePodcastLink }: ApplePodcastButtonProps) {
  return (
    <Link
      href={applePodcastLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs bg-purple-600 text-white font-bold py-1 px-2 rounded hover:bg-purple-500 transition-colors flex items-center space-x-1"
    >
      <span>Listen on Apple Podcasts</span>
    </Link>
  );
}
