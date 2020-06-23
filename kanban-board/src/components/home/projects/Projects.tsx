import React from "react";
import { useProjectContext } from "../../../contexts/ProjectContext";
import ProjectItem from "./ProjectItem";

interface Props {}

const Projects: React.FC<Props> = () => {
  const { projects } = useProjectContext();

  return (
    <div className="space-y-4">
      <h1 className="text-4xl text-gray-700">Projects</h1>
      {projects?.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
