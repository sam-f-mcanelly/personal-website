import JobTimeline from './jobs';
import EducationTimeline from './education';

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-12 h-[calc(100%-8rem)] w-px bg-green-500/30" />

      {/* Experience section */}
      <JobTimeline />

      {/* Education section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6 px-20 text-neutral-subheading">Education</h2>
        <div>
          <EducationTimeline />
        </div>
      </div>
    </div>
  );
}