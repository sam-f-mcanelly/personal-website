import JobTimeline from './jobs';
import EducationTimeline from './education';

export default function Timeline() {
  return (
    <div>
      <JobTimeline />

      <h2 className="text-xl font-bold mt-8 mb-4 text-neutral-subheading">Education</h2>
      <EducationTimeline />
    </div>
  );
}
