import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text'

const styles = StyleSheet.create({
    ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2, // Määrittää reunuksen leveyden
    borderColor: '#0366d6', // Määrittää reunuksen värin
    backgroundColor: 'white', // Taustaväri
    },
    ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0366d6',
    },
    flexContainer: {
      paddingStart: 15,
      paddingTop: 15,
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    flexContainer3: {
    paddingStart: 15,
    textAlign: 'justify',
    paddingEnd: 15,
    flexGrow: 1,
    },
})

const formattedDate = (datetime) => {
    const date = new Date(datetime);
    const day = ('0' + date.getDate()).slice(-2); // Päivä kaksinumeroisena
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Kuukausi kaksinumeroisena
    const year = date.getFullYear(); // Vuosi nelinumeroisena

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

const SingleReview = (item) => {

return (
    <View style={styles.flexContainer}>
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{`${item.rating}`}</Text>
        </View>
        <View style={[styles.flexContainer3, { width: '90%' }]}>
            <Text marginBottom="primary" fontWeight="bold">{`${item.repository.fullName}`}</Text>
            <Text marginBottom="primary" color="textSecondary">{`${formattedDate(item.createdAt)}`}</Text>
            <Text style={styles.reviewText} marginBottom="primary">{item.text}</Text>
        </View>
    </View>
)}

export default SingleReview;