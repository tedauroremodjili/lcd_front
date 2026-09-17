"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project, ServiceSlug } from "@/lib/types";
import { serviceLabels } from "@/lib/utils";

const filterOrder: (ServiceSlug | "tous")[] = [
  "tous",
  "marbrerie",
  "menuiserie",
  "ebenisterie",
  "importation",
  "commerce-general",
];

export default function ProjectFilters({
  projects,
  className = "",
}: {
  projects: Project[];
  className?: string;
}) {
  const [active, setActive] = useState<ServiceSlug | "tous">("tous");

  const available = useMemo(
    () => filterOrder.filter((f) => f === "tous" || projects.some((p) => p.service === f)),
    [projects]
  );

  const filtered =
    active === "tous" ? projects : projects.filter((p) => p.service === active);

  return (
    <div className={className}>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {available.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === filter
                ? "bg-navy text-white"
                : "bg-white text-navy hover:bg-navy/10"
            }`}
          >
            {filter === "tous" ? "Tous" : serviceLabels[filter]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-charcoal/60">
          Aucune réalisation dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
