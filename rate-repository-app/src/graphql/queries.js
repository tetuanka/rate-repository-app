import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
          }
        }
      }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
