import {
  Cloud,
  Package,
  ShoppingCart,
  Waves,
  GraduationCap,
} from "lucide-react";
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
    icon: "/images/resume/aws_icon.jpg",
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
    icon: "/images/resume/aws_icon.jpg",
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

export default function Resume() {
  return (
    <div className="lg:w-2/3">
      <section id="about" className="py-8">
        <div className="container px-4 md:px-4">
          <h2 className="text-3xl font-bold mb-12 text-neutral-heading">
            Professional Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-12 h-[calc(100%-36rem)] w-px bg-green-500/30" />

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
                          ? "bg-yellow-500 border-yellow-900/50"
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
              <h2 className="text-xl font-bold mb-6 text-neutral-subheading">
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

            {/* Skills section */}
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6 text-neutral-subheading">
                Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                  <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                    Amazon Web Systems
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Lambda",
                      "API Gateway",
                      "CloudFormation",
                      "CloudWatch",
                      "SQS",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300 borderborder-orange-500/50 dark:border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                  <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Kotlin",
                      "Java",
                      "TypeScript",
                      "JavaScript",
                      "Python",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 border border-blue-500/50 dark:border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                  <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                    Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Dagger", "Spring", "Docker", "CDK"].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-red-500/20 rounded-full text-sm text-red-300 border border-red-500/50 dark:border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl hover:scale-[1.02] dark:border-slate-800">
                  <h3 className="text-lg font-semibold mb-2 text-neutral-heading">
                    Areas of Focus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Infrastructure as Code",
                      "Back-end (Ktor, RPC, REST)",
                      "Serverless",
                      "Scalability",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-500/20 rounded-full text-sm text-green-300 border border-green-500/50 dark:border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
