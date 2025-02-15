import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <section id="intro" className="py-4 md:py-6 lg:py-8">
      <div className="container px-4 md:px-24 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-48 h-48 relative overflow-hidden rounded-full border-4 border-neutral-accent/30">
            <Image
              src="/images/header/IMG_5132.jpg"
              alt="Sam McAnelly"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start justify-center space-y-2 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-neutral-heading">
              Sam McAnelly
            </h1>
            <p className="text-neutral-subheading text-sm md:text-base max-w-md">
              Software Development Engineer with a focus on scalable, serverless solutions and
              infrastructure as code.
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
