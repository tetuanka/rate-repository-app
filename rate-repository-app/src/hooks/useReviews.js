import {  GET_REVIEWS } from '../graphql/queries';  
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
    
 const useReviews = (repositoryId) => {     
    const [reviews, setReviews] = useState();

    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
        variables: { repositoryId: repositoryId, first: 8, after: ""}
      });

      //const reviews = data.repository.reviews.edges.map((edge) => edge.node);

      useEffect(() => {
		if (!loading && !error) {
			try {
				setReviews(data.repository.reviews.edges.map((edge) => edge.node));
			} catch (e) {
				console.log(e);
			}
		}
	}, [loading, error, data]);



      const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
          },
        });
      };

    
      return {
        reviews,
        fetchMore: handleFetchMore,
        loading,
        error,
        ...result
      };
    }

export { useReviews };