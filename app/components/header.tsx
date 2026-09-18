import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from '@/components/icons';

export default function Header() {
  return (
    <section id="intro">
      <div className="container px-4 md:px-24 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative overflow-hidden rounded-full border-4 border-neutral-accent/30">
            <Image
              src="/images/header/IMG_5132.jpg"
              alt="Sam McAnelly"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-2 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-neutral-heading">
              Sam McAnelly
            </h1>
            <p className="text-neutral-subheading text-sm md:text-base max-w-xl">
              Senior Software Engineer at Netflix, working across the org&apos;s distributed systems
              to deliver new content experiences end to end, with a view of how each piece serves
              the broader business.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <Link
                href="https://www.linkedin.com/in/sam-mcanelly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-accent hover:text-neutral-heading transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/sam-f-mcanelly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-accent hover:text-neutral-heading transition-colors"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              {/* <Link
                href="https://x.com/sammcanelly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-accent hover:text-neutral-heading transition-colors"
              >
                <Twitter className="w-6 h-6" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://www.youtube.com/@sammcanelly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-accent hover:text-neutral-heading transition-colors"
              >
                <Youtube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
