import Image from 'next/image';
import TimelineItem from './timeline-item';

const educationItems = [
  {
    startDate: 'Aug 2013',
    endDate: 'May 2019',
    institution: 'Oklahoma State University',
    degree: 'Bachelor of Science in Computer Engineering',
    minor: 'Minor in Computer Science',
    icon: '/images/resume/osu_seal.png',
  },
  {
    startDate: 'Aug 2011',
    endDate: 'May 2013',
    institution: 'Tulsa Technology Center',
    degree: 'Cyber Security',
    minor: 'Forensics',
    icon: '/images/resume/ttc.jpg',
  },
];

export default function EducationTimeline() {
  return (
    <ol>
      {educationItems.map((item, index) => (
        <TimelineItem key={index} startDate={item.startDate} endDate={item.endDate}>
          <div className="bg-black/60 backdrop-blur-xs p-4 md:p-5 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.01] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-md shrink-0">
                <Image
                  src={item.icon}
                  alt={`${item.institution} Logo`}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-neutral-subheading">
                  {item.institution}
                </h3>
                <p className="text-sm text-neutral-accent">
                  {item.degree} | {item.minor}
                </p>
              </div>
            </div>
          </div>
        </TimelineItem>
      ))}
    </ol>
  );
}
