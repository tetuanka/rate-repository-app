import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Menu, Divider, PaperProvider, Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    textAlign: 'left', // Vasen reuna
  },
  arrowContainer: {
    flex: 1,
    textAlign: 'right',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const { repositories, loading, refetch } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const navigate = useNavigate();
  const [title, setTitle] = useState('Latest repositories');
  


  const renderHeader = () => { 
    const [menuVisible, setMenuVisible] = useState(false);
    
    const handleOrderByChange = (value, direction, title) => {
      setTitle(title)
      setOrderBy(value);
      setOrderDirection(direction);
      setMenuVisible(false);
      refetch({ orderBy: value, orderDirection: direction });
    };
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return ( 
      <View>
        <Menu 
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Text style={styles.container} onPress={openMenu}>
                    <Text style={styles.titleContainer}>{title}</Text>
                    <Text style={styles.arrowContainer}>▼</Text>
                  </Text>}
        >
          <Menu.Item disabled title="Select an item..." />
          <Menu.Item onPress={() => handleOrderByChange('CREATED_AT', 'ASC', 'Latest repositories')} title="Latest repositories" />
          <Menu.Item onPress={() => handleOrderByChange('RATING_AVERAGE', 'DESC', 'Highest rated repositories')} title="Highest rated repositories" />
          <Menu.Item onPress={() => handleOrderByChange('RATING_AVERAGE', 'ASC', 'Lowest rated repositories')} title="Lowest rated repositories" />
        </Menu>
        <Divider />
      </View>
    )
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const handlePress = (id) => {
      navigate(`/repository/${id}`); // Navigate to RepositoryView with repository ID
    };

  return (
    <PaperProvider>
      <Searchbar
        placeholder="Search repositories"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
      />
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <Pressable onPress={() => handlePress(item.id)}><RepositoryItem item={item} /></Pressable>}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshing={loading}
      />
    </PaperProvider>
  );
};

export default RepositoryList;