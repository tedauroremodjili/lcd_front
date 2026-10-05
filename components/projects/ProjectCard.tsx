import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Project } from "@/lib/types";
import { serviceLabels } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group block overflow-hidden rounded-2xl bg-surface shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(6,37,74,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImagePlaceholder
          id={project.image}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge tone="light">{serviceLabels[project.service]}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif-display text-lg font-bold text-heading">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body/70">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
