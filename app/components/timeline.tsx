import Image from "next/image";

const timelineItems = [
  {
    startDate: "Oct 2021",
    endDate: "Present",
    title: "Amazon Web Services",
    role: "Software Development Engineer II",
    icon: "/images/resume/aws_icon.jpg",
    description: [
      "Led design and implementation of major features in a developer tools platform that automated infrastructure creation across AWS regions",
      "Spearheaded a cross-team initiative to automate regional infrastructure deployment, significantly reducing time-to-market for new AWS region launches",
      "Developed automated validation systems to detect and alert teams about regressions affecting regional expansion",
      "Established best practices and provided technical guidance to teams across Amazon for infrastructure-as-code implementation",
      "Collaborated with product teams to design scalable solutions for multi-region deployment strategies",
    ],
  },
  {
    startDate: "Aug 2019",
    endDate: "Oct 2021",
    title: "Amazon.com",
    role: "Software Development Engineer I",
    icon: "/images/resume/amazon_retail_logo.png",
    description: [
      "Architected and implemented a service optimization for Multi-Channel Fulfillment that eliminated over 600,000 daily service calls",
      "Led the development of a carrier preference feature for off-Amazon channel fulfillment, coordinating with five teams",
      "Completed the carrier preference project eight weeks after initial request, meeting aggressive timeline requirements",
      "Built and maintained full-stack services for vendor price optimization in Amazon's retail sourcing platform",
    ],
  },
  {
    startDate: "May 2018",
    endDate: "Aug 2018",
    title: "Amazon.com",
    role: "Software Development Engineer Intern",
    icon: "/images/resume/amazon_retail_logo.png",
    description: [
      "Enhanced performance of internal tooling by implementing pagination for large-scale data tables",
      "Developed a web interface for auditing product sourcing cost calculations",
      "Created detailed documentation for the auditing system to facilitate future maintenance",
    ],
  },
  {
    startDate: "May 2017",
    endDate: "Aug 2017",
    title: "Garmin",
    role: "Software Engineer Intern",
    icon: "/images/resume/garmin_logo.png",
    description: [
      "Designed and implemented a forward collision warning system for marine electronics",
      "Developed algorithms for processing front-facing scanning sonar data in real-time",
      "Created test suites to validate collision detection accuracy",
      "Collaborated with UX team to design intuitive alert mechanisms",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-12 h-[calc(100%-8rem)] w-px bg-green-500/30" />

      {/* Timeline items */}
      <div className="space-y-8">
        {timelineItems.map((item, index) => (
          <div key={index} className="relative pl-16">
            {/* Timeline marker with dates */}
            <div className="absolute left-0 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center">
              <div className="text-sm text-neutral-accent mb-2 whitespace-nowrap">
                {item.endDate}
              </div>
              <div
                className={`w-4 h-4 rounded-full border-4 ${
                  item.endDate === "Present"
                    ? "bg-yellow-500 border-yellow-900/50 animate-pulse"
                    : "bg-red-500 border-red-900/50"
                }`}
              />

              <div className="flex-grow w-px bg-purple-500/30" />
              <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-purple-900/50" />
              <div className="text-sm text-neutral-accent mt-2 whitespace-nowrap">
                {item.startDate}
              </div>
            </div>

            {/* Content card */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-full h-full bg-neutral-accent/5 rounded-lg transform rotate-1 z-0" />
              <div className="relative z-10 bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-white">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50} // Adjust size as needed
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-heading">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-accent mb-4">
                      {item.role}
                    </p>
                    <ul className="list-disc ml-2 space-y-1 text-neutral-text">
                      {item.description.map((desc, i) => (
                        <li key={i} className="pl-2">
                          <span className="-ml-2">
                            {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6 px-20 text-neutral-subheading">
          Education
        </h2>
        <div className="relative pl-16">
          {/* Timeline markers with dates */}
          <div className="absolute left-0 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center">
            <div className="text-sm text-neutral-accent mb-2 whitespace-nowrap">
              May 2019
            </div>
            <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-red-900/50" />
            <div className="flex-grow w-px bg-purple-500/30" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-green-900/50" />
            <div className="text-sm text-neutral-accent mt-2 whitespace-nowrap">
              Aug 2013
            </div>
          </div>

          {/* Content card */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-full h-full bg-neutral-accent/5 rounded-lg transform rotate-1 z-0" />
            <div className="relative z-10 bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-lg">
                  <Image
                    src="/images/resume/osu_seal.png"
                    alt="OSU Seal"
                    width={50} // Adjust size as needed
                    height={50}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-subheading">
                    Oklahoma State University
                  </h3>
                  <p className="text-sm text-neutral-accent">
                    Bachelor of Science in Computer Engineering | Minor in
                    Computer Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
