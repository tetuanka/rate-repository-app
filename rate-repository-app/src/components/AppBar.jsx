import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import AppBarTab from './AppBarTab'


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  },
  tab: {
    padding: 10,
  },
  scrollView: {
    flexGrow: 1
  },
  tabText: {
    color: 'white', 
    fontSize: 24,
    paddingBottom: 15,
  },
});
  
const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, loading } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const currentUser = data?.me;

  if (loading) {
      return null;
  }

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    console.log(authStorage)
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
      <AppBarTab text="Repositories" to="/"  />
      {currentUser ? (
          <Pressable style={styles.tab} onPress={handleSignOut}>
            <Text style={styles.tabText}>Sign Out</Text>
        </Pressable>
      ) : (
        <AppBarTab text="Sign In" to="/signin" />
      )}
      </ScrollView>
    </View>
  );
};

export default AppBar;