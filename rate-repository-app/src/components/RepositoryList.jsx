import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const handlePress = (id) => {
      navigate(`/repository/${id}`); // Navigate to RepositoryView with repository ID
    };

  return (
    <FlatList
    data={repositoryNodes}
      renderItem={({ item }) => <Pressable onPress={() => handlePress(item.id)}><RepositoryItem item={item} /></Pressable>}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;