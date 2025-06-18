import React from 'react';
import { skillToColor, getColorClasses, type Skill } from '../../../common/skill-colors';

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Amazon Web Systems',
    skills: [
      'Lambda',
      'API Gateway',
      'CloudFormation',
      'CloudWatch',
      'SQS',
      'DynamoDB',
      'S3',
      'IAM',
      'SNS',
    ] as Skill[],
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
      'Scalability',
      'Sovereign Computing',
      'Event-Driven Architecture',
      'Distributed Systems'
    ] as Skill[],
  },
];

export default function Skills() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-6 text-neutral-subheading">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          return (
            <div
              key={category.title}
              className={`bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02]`}
            >
              <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const color = skillToColor[skill];
                  const classes = getColorClasses(color);
                  return (
                    <span
                      key={skill}
                      className={`px-2 py-1 ${classes?.bg || 'bg-green-500'} rounded-full text-sm ${classes?.text || 'text-white'}`}
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
