import Image from 'next/image';

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
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-12 h-[calc(100%-8rem)] w-px bg-green-500/30" />
      <div className="space-y-8">
        {educationItems.map((item, index) => (
          <div key={index} className="relative pl-16">
            {/* Timeline markers with dates */}
            <div className="absolute left-0 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center">
              <div className="text-sm text-neutral-accent mb-2 whitespace-nowrap">
                {item.endDate}
              </div>
              <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-red-900/50" />
              <div className="flex-grow w-px bg-purple-500/30" />
              <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-green-900/50" />
              <div className="text-sm text-neutral-accent mt-2 whitespace-nowrap">
                {item.startDate}
              </div>
            </div>

            {/* Content card */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-full h-full bg-neutral-accent/5 rounded-lg transform rotate-1 z-0" />
              <div className="relative z-10 bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-lg">
                    <Image
                      src={item.icon}
                      alt={`${item.institution} Logo`}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-subheading">
                      {item.institution}
                    </h3>
                    <p className="text-sm text-neutral-accent">
                      {item.degree} | {item.minor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}