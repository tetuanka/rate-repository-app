
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const onSubmit = (values) => {
  console.log(values);
};

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn onSubmit={onSubmit} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
      </Routes>
    </View>
  );
};

export default Main;