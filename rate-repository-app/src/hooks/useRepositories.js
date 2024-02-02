import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = () => {
    
  const { data, loading  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'network-only',
  });

  console.log(data)
  const repositoryNodes = data?.repositories.edges || [];


  return {
    repositories: repositoryNodes.map((node) => node),
    loading,
  };
};

export default useRepositories;


