import React from 'react';
import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  flexContainer: {
    flexDirection: 'row'
  },
  flexContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flexContainer2: {
    padding: 15,
  },
  flexContainer3: {
    padding: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexContainerItem: {
    marginBottom: 10,
    alignItems: 'center'
  },
  box: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0366d6',
    paddingStart: 8,
    paddingEnd: 8,
    padding: 5,
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    marginStart: 15,
    marginEnd: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 3,
  },
});

function formatNumber(number) {
  if (number >= 1000) {
    const abbreviated = (number / 1000).toFixed(1);
    return `${abbreviated}k`;
  } else {
    return number.toString();
  }
}

const RepositoryItem = ({ item, showButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.flexContainer2}>
          <Image
            style={styles.tinyLogo}
            source={{uri:item.ownerAvatarUrl}}
          />
        </View>
        <View style={styles.flexContainer2}>
          <Text marginBottom="primary" fontWeight="bold">{item.fullName}</Text>
          <Text marginBottom="primary" color="textSecondary">{item.description}</Text>
          <View style={styles.box}>
            <Text color='white'>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer1}>
        <View style={styles.flexContainer3}>
          <Text fontWeight="bold" marginBottom="primary">{formatNumber(item.stargazersCount)}</Text><Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.flexContainer3}>
          <Text fontWeight="bold" marginBottom="primary">{formatNumber(item.forksCount)}</Text><Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.flexContainer3}>
          <Text fontWeight="bold" marginBottom="primary">{item.reviewCount}</Text><Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.flexContainer3}>
          <Text fontWeight="bold" marginBottom="primary">{item.ratingAverage}</Text><Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {showButton && (
      <Pressable onPress={() =>  Linking.openURL(item.url)} style={styles.button}>
          <Text color='white'>{"Open in GitHub"}</Text>
      </Pressable>
    )}
    </View>
  );
};

export default RepositoryItem;
