import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
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
  }, [data])

//  console.log("data:")
//  console.log(data)
//  console.log(error)


  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;


