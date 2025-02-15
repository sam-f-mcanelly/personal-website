import Skills from './skills';
import Timeline from './timeline';

export default function Resume() {
  return (
    <div className="lg:w-2/3">
      <section id="about" className="py-8">
        <div className="container px-4 md:px-4">
          <h2 className="text-3xl font-bold mb-12 text-neutral-heading">Professional Experience</h2>
          <Timeline />
          <Skills />
        </div>
      </section>
    </div>
  );
}
