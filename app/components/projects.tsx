import ProjectCard from './project-card';

export default function Projects() {
  return (
    <div className="lg:w-1/3">
      <section id="projects" className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-neutral-heading">Projects</h2>
        <div className="space-y-8 py-5">
          <ProjectCard
            title="Crypto Tax Calculator"
            description="A transaction managment and tax reporting software for hodlers who prefer to self custody their assets."
            image="/images/projects/bitcoin_tracker.png"
            link="https://github.com"
            tags={['React', 'Next.js', 'H2', 'Ktor', 'Kotlin', 'JUnit', 'MockK', 'Docker', 'Dagger']}
          />
          <ProjectCard
            title="Personal Website"
            description="A Next.js application that provides a window into my career and life."
            image="/images/projects/personal_website.png"
            link="https://github.com/sam-f-mcanelly/personal-website/tree/main"
            tags={['Next.js', 'Docker', 'React', 'TypeScript', 'TailwindCSS']}
          />
        </div>
      </section>
    </div>
  );
}
