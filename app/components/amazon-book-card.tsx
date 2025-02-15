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
    <div className="flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative w-32 h-auto mb-4">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          width={128}
          height={192}
          className="object-contain rounded-md"
        />
      </div>
      <h3 className="text-sm font-semibold text-neutral-heading text-center mb-1">{title}</h3>
      <p className="text-xs text-neutral-accent mb-2">{author}</p>
      <Link
        href={amazonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs bg-yellow-500 text-black font-bold py-1 px-2 rounded hover:bg-yellow-400 transition-colors"
      >
        View on Amazon
      </Link>
    </div>
  );
}
