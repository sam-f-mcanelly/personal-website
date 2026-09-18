import Image from 'next/image';
import Link from 'next/link';

interface AmazonBookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  amazonLink: string;
}

export default function AmazonBookCard({
  title,
  author,
  imageUrl,
  amazonLink,
}: AmazonBookCardProps) {
  return (
    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xs rounded-lg p-3 transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]">
      <Image
        src={imageUrl || '/placeholder.svg'}
        alt={title}
        width={56}
        height={84}
        className="w-14 h-auto shrink-0 object-contain rounded-sm"
      />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-neutral-heading">{title}</h3>
        <p className="text-xs text-neutral-accent mb-2">{author}</p>
        <Link
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs bg-yellow-500 text-black font-bold py-1 px-2 rounded hover:bg-yellow-400 transition-colors"
        >
          View on Amazon
        </Link>
      </div>
    </div>
  );
}
