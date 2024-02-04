import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();


    const signOut = async () => {
        console.log("logging out")
        // Remove the access token from storage
        console.log(authStorage)
        await authStorage.removeAccessToken();
        // Reset the Apollo Client's store
        await apolloClient.resetStore();

        console.log("logged out")
      };
  
    return signOut;
  };

export default useSignOut;
