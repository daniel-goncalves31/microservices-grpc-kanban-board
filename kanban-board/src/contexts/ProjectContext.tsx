import { useApolloClient } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import {
  GetProjectsDocument,
  GetProjectsQuery,
  ProjectResponse as Project,
} from "../graphql/generated";
import handleErrors from "../utils/handleApolloErrors";

interface Context {
  projects: Project[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;
}

const ProjectContext = React.createContext<Context>({
  projects: null,
  setProjects: () => {},
});

const useProjectContext = () => useContext(ProjectContext);

const ProjectProvider: React.FC = ({ children }) => {
  const [projects, setProjects] = useState<Project[] | null>(null);

  const { query } = useApolloClient();

  const fetchProject = async () => {
    try {
      const res = await query<GetProjectsQuery>({
        query: GetProjectsDocument,
      });
      const projects = res.data.getProjects.projects;
      if (!projects) {
        setProjects(null);
      } else {
        setProjects(projects);
      }
    } catch (error) {
      handleErrors(error);
      setProjects(null);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { useProjectContext, ProjectProvider };
