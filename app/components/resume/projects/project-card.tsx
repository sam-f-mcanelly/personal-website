import { Card, CardContent } from '@/components/ui/card';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Color, Skill, skillToColor } from '../../../common/skill-colors';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  const isKnownSkill = (tag: string): tag is Skill => {
    return tag in skillToColor;
  };

  const getTagColor = (tag: string): Color | 'green' => {
    if (isKnownSkill(tag)) {
      return skillToColor[tag];
    }
    return 'green';
  };

  return (
    <Card className="overflow-hidden bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-black/80 hover:shadow-xl hover:scale-[1.02] text-opacity-100">
      <div className="relative h-40">
        <Image src={
          image || '/images/placeholder.svg'} 
          alt={title} 
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-neutral-heading">{title}</h3>
        <p className="text-sm text-neutral-text mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => {
              const color = getTagColor(tag); 
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-medium bg-${color}-500/20 text-${color}-300`}
                >
                  {tag}
                </span>
              );
            })}
        </div>
        <Link
          href={link}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-neutral-accent hover:underline"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </Link>
      </CardContent>
    </Card>
  );
}
