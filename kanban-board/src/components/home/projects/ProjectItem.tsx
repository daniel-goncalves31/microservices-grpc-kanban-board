import React from "react";
import { ProjectResponse } from "../../../graphql/generated";

interface Props {
  project: ProjectResponse;
}

const ProjectItem: React.FC<Props> = ({ project }) => {
  return (
    <div className="p-4 grid grid-cols-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 hover:shadow-lg ease duration-500">
      <p>{project.name}</p>
      <p className="text-center">
        {new Date(project.createdAt).toLocaleString()}
      </p>
      <div className="text-center">{project.status}</div>
      <div className="text-center">{project.priority}</div>
    </div>
  );
};

export default ProjectItem;
