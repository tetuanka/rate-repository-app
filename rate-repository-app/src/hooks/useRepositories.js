import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState();

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
  });
  

  const fetchRepositories = async () => {
    if (data) {
        setRepositories(data.repositories)
    }
  }
  useEffect(() => {
    if (data) {
        fetchRepositories()
    }
  }, [data, orderBy, orderDirection])


  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;


