import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const apolloUri = Constants.manifest.extra.APOLLO_URI;

const httpLink = createHttpLink({
    uri: apolloUri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
      },
  });
};

export default createApolloClient;