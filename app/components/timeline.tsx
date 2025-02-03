import Image from "next/image";

const timelineItems = [
  {
    startDate: "Oct 2021",
    endDate: "Present",
    title: "Amazon Web Services",
    role: "Software Development Engineer II",
    icon: "/images/resume/aws_icon.jpg",
    description: [
      "Led design and implementation of major features in a developer tools platform for automated infrastructure creation.",
      "Spearheaded a cross-team initiative to automate deployment of regional infrastructure.",
      "Provided guidance on best practices for maintaining and creating infrastructure as code.",
    ],
  },
  {
    startDate: "Aug 2019",
    endDate: "Oct 2021",
    title: "Amazon.com",
    role: "Software Development Engineer I",
    icon: "/images/resume/amazon_retail_logo.png",
    description: [
      "Built a service to reduce processing in the Multi-Channel Fulfillment order intake system.",
      "Developed a feature for sellers to set preferences package carriers in off-Amazon channels.",
      "Maintained back-end and front-end web services for optimizing product sourcing prices.",
    ],
  },
  {
    startDate: "May 2018",
    endDate: "Aug 2018",
    title: "Amazon.com",
    role: "Software Development Engineer Intern",
    icon: "/images/resume/amazon_retail_logo.png",
    description: [
      "Improved loading times of an internal website by implementing paginated for large data tables.",
      "Built a web page showing audit data about product sourcing cost calculations.",
    ],
  },
  {
    startDate: "May 2017",
    endDate: "Aug 2017",
    title: "Garmin",
    role: "Software Engineer Intern",
    icon: "/images/resume/garmin_logo.png",
    description: [
      "Designed and implemented a forward collision alarm for fish finders using front-facing scanning sonar.",
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
                    <ul className="list-disc list-inside space-y-1 text-neutral-text">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
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
