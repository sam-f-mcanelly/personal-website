import { skillToColor } from '../common/skill-colors';

type Skill = keyof typeof skillToColor;

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Amazon Web Systems',
    skills: ['Lambda', 'API Gateway', 'CloudFormation', 'CloudWatch', 'SQS'] as Skill[],
  },
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'TypeScript', 'JavaScript', 'Python'] as Skill[],
  },
  {
    title: 'Frameworks',
    skills: ['Spring', 'Dagger', 'CDK', 'JUnit', 'MockK', 'Next.js'] as Skill[],
  },
  {
    title: 'Areas of Focus',
    skills: [
      'Infrastructure as Code',
      'Back-end (Ktor, RPC, REST)',
      'Serverless',
      'Scalability'
    ] as Skill[],
  },
];

export default function Skills() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-6 text-neutral-subheading">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const firstSkillColor = skillToColor[category.skills[0]];
          return (
            <div
              key={category.title}
              className={`bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-${firstSkillColor}-500/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-${firstSkillColor}-500/50 hover:shadow-xl hover:scale-[1.02]`}
            >
              <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const color = skillToColor[skill];
                  return (
                    <span
                      key={skill}
                      className={`px-2 py-1 bg-${color}-500/20 rounded-full text-sm text-${color}-300`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}