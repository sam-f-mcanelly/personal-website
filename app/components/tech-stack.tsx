import { Card } from '@/components/ui/card';

const technologies = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'GraphQL'],
    color: 'purple',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
    color: 'indigo',
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Nginx'],
    color: 'cyan',
  },
  {
    category: 'Tools',
    skills: ['VS Code', 'Postman', 'Figma', 'Jest', 'GitHub', 'Vercel'],
    color: 'pink',
  },
];

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card
          key={tech.category}
          className={`p-6 bg-black/60 backdrop-blur-sm border border-${tech.color}-500/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-${tech.color}-500/50 hover:shadow-xl hover:scale-[1.02]`}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className={`inline-flex items-center rounded-full bg-${tech.color}-500/20 px-2 py-1 text-sm font-medium text-${tech.color}-300 border border-${tech.color}-500/50`}
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
