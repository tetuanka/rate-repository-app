import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

return (
  <FlatList
  data={repositoryNodes}
    renderItem={({ item }) => <RepositoryItem item={item} />}
    ItemSeparatorComponent={ItemSeparator}
  />
);
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;


