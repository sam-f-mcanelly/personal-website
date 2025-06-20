import ProjectCard from './project-card';

export default function Projects() {
  return (
    <div className="lg:w-1/3">
      <section id="projects" className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-neutral-heading">Projects</h2>
        <div className="space-y-8 py-5">
          <ProjectCard
            title="Stack Track"
            description="A transaction tracking and tax reporting software for BTC hodlers who prefer to self custody their assets."
            image="/images/projects/stack-track-dark.png"
            links={[
              {
                name: 'View on GitHub - Backend',
                link: 'https://github.com/sam-f-mcanelly/stack-track-core',
              },
              {
                name: 'View on GitHub - Frontend',
                link: 'https://github.com/sam-f-mcanelly/stack-track',
              },
            ]}
            tags={[
              'React',
              'Node.js',
              'Next.js',
              'Docker',
              'H2',
              'Ktor',
              'Kotlin',
              'JUnit',
              'MockK',
              'Dagger',
            ]}
          />
          <ProjectCard
            title="Personal Website"
            description="A Next.js application that provides a window into my career and life."
            image="/images/projects/personal_website.png"
            links={[
              {
                name: 'View on GitHub',
                link: 'https://github.com/sam-f-mcanelly/personal-website',
              },
            ]}
            tags={['Next.js', 'Docker', 'React', 'TypeScript', 'TailwindCSS']}
          />
          <ProjectCard
            title="Home Server CI/CD pipeline with Gitea and Docker"
            description="A homebrew solution for managing an Umbrel Linux home server with continuous integration and deployment using Gitea and Docker."
            image="/images/projects/gitea-ci-cd.png"
            links={[
              {
                name: 'View on GitHub',
                link: 'https://github.com/sam-f-mcanelly/portainer-gitea-ci-cd',
              },
            ]}
            tags={['Docker', 'Github Actions', 'CI/CD', 'Linux']}
          />
        </div>
      </section>
    </div>
  );
}
