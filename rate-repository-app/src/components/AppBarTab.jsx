import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link as ReactRouterLink } from 'react-router-native';

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

const AppBarTab = ({ text, to }) => (
    <Pressable style={styles.tab} onPress={() => console.log(`${text} pressed`)}>
    <ReactRouterLink to={to}>
      <Text style={styles.tabText}>{text}</Text>
    </ReactRouterLink>
  </Pressable>
  );

export default AppBarTab;