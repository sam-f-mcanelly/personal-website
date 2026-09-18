import Header from './components/header';
import Resume from './components/resume/resume';
import Projects from './components/resume/projects/projects';
import Skills from './components/resume/timeline/skills';
import Interests from './components/personal/interests';
import Gallery from './components/personal/gallery';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen text-foreground relative z-10">
      <main className="container px-4 md:px-6 py-6 space-y-12">
        <Header />

        <div className="flex flex-col lg:flex-row gap-8">
          <Resume />
          <aside className="lg:w-1/3 space-y-12">
            <Projects />
            <Skills />
          </aside>
        </div>

        <Interests />

        <Gallery />
      </main>

      <footer className="border-t border-white/20 bg-black/40 backdrop-blur-md">
        <div className="container flex flex-col gap-1 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-neutral-accent">© 2025 Sam McAnelly. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4">
            <Link
              className="text-xs hover:underline underline-offset-4 text-neutral-heading"
              href="/terms"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
