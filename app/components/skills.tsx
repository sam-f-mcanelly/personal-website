export default function Skills() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-6 text-neutral-subheading">Skills</h2>
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
                className="px-2 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300"
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
            {["Kotlin", "Java", "TypeScript", "JavaScript", "Python"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
                >
                  {skill}
                </span>
              )
            )}
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
                className="px-2 py-1 bg-red-500/20 rounded-full text-sm text-red-300"
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
                className="px-2 py-1 bg-green-500/20 rounded-full text-sm text-green-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
