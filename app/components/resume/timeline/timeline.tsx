import JobTimeline from './jobs';
import EducationTimeline from './education';

export default function Timeline() {
  return (
    <div className="relative">
      

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