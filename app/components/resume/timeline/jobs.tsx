import Image from 'next/image';
import TimelineItem from './timeline-item';

const experienceItems = [
  {
    startDate: 'Aug 2025',
    endDate: 'Present',
    title: 'Netflix',
    role: 'Senior Software Engineer',
    icon: '/images/resume/netflix.png',
    description: [
      'Led design and implementation of the Netflix end of playback experience on a new platform that serves the Netflix UI. This includes recommendations, title overrides, special handling for sensitive content, and the baseline next episode experience',
      'The end of playback page has a failure rate below 0.0001% while serving 6k RPS. This is accomplished through utilizing redundant fallback handlers, optimized best trailer selection algorithm, and batched network calls',
      'Expanded a DSL that is used to configure the business rules of the Netflix UI so that engineers can configure buttons and actions across Netflix pages. The feature reduced the investigation time for button and countdown configurations from several hours to less than five minutes',
    ],
  },
  {
    startDate: 'Oct 2021',
    endDate: 'Aug 2025',
    title: 'Amazon Web Services',
    role: 'Software Development Engineer II',
    icon: '/images/resume/aws_icon.jpg',
    description: [
      'Built comprehensive package discovery and analysis platform that scales to process 100,000+ software packages in single execution runs, identifying source types and infrastructure artifacts across code packages',
      'Led full system architecture design including serverless workflows, database optimization, and monitoring infrastructure, transforming basic scripting solution into production-grade platform',
      'Led design and implementation of major features in a developer tools platform that automated infrastructure creation across AWS regions',
      'Drove a cross-team initiative to automate regional infrastructure deployment, significantly reducing time-to-market for new AWS region launches',
      'Established best practices and provided technical guidance to teams across Amazon for infrastructure-as-code implementation',
      'Collaborated with product teams to design scalable solutions for multi-region deployment strategies',
    ],
  },
  {
    startDate: 'Aug 2019',
    endDate: 'Oct 2021',
    title: 'Amazon.com',
    role: 'Software Development Engineer I',
    icon: '/images/resume/amazon_retail_logo.png',
    description: [
      'Architected and implemented a service optimization for Multi-Channel Fulfillment that eliminated over 600,000 daily service calls',
      'Led the development of a carrier preference feature for off-Amazon channel fulfillment, coordinating with five teams',
      'Completed the carrier preference project eight weeks after initial request, meeting aggressive timeline requirements',
      "Built and maintained full-stack services for vendor price optimization in Amazon's retail sourcing platform",
    ],
  },
  {
    startDate: 'May 2018',
    endDate: 'Aug 2018',
    title: 'Amazon.com',
    role: 'Software Development Engineer Intern',
    icon: '/images/resume/amazon_retail_logo.png',
    description: [
      'Enhanced performance of internal tooling by implementing pagination for large-scale data tables',
      'Developed a web interface for auditing product sourcing cost calculations',
      'Created detailed documentation for the auditing system to facilitate future maintenance',
    ],
  },
  {
    startDate: 'May 2017',
    endDate: 'Aug 2017',
    title: 'Garmin',
    role: 'Software Engineer Intern',
    icon: '/images/resume/garmin_logo.png',
    description: [
      'Designed and implemented a forward collision warning system for marine electronics',
      'Developed algorithms for processing front-facing scanning sonar data in real-time',
      'Created test suites to validate collision detection accuracy',
      'Collaborated with UX team to design intuitive alert mechanisms',
    ],
  },
  {
    startDate: 'Apr 2012',
    endDate: 'Dec 2013',
    title: 'TheNewBoston',
    role: 'Software Educator & Content Creator ',
    icon: '/images/resume/thenewboston.png',
    description: [
      'Taught Microsoft Visual Basic through Youtube videos that showed the development process',
      'Produced 200 lessons covering many aspects of the .NET framework',
      'https://www.youtube.com/@thenewboston',
    ],
  },
];

export default function JobTimeline() {
  return (
    <ol>
      {experienceItems.map((item, index) => (
        <TimelineItem key={index} startDate={item.startDate} endDate={item.endDate}>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-white shrink-0">
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-neutral-heading">{item.title}</h3>
              <p className="text-sm text-neutral-accent">{item.role}</p>
            </div>
          </div>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-sm md:text-base text-neutral-text">
            {item.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </TimelineItem>
      ))}
    </ol>
  );
}
