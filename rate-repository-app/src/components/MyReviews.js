import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
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
    columnContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingStart: 15,
        paddingBottom: 15,
    },
    viewButton: {
        padding: 15,
        margin: 7.5,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#0366d6',
        borderRadius: 3,
    },
    deleteButton: {
        padding: 15,
        margin: 7.5,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#D6394C',
        borderRadius: 3,
    }
})

const formattedDate = (datetime) => {
    const date = new Date(datetime);
    const day = ('0' + date.getDate()).slice(-2); // Päivä kaksinumeroisena
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Kuukausi kaksinumeroisena
    const year = date.getFullYear(); // Vuosi nelinumeroisena

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

const MyReviews = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(ME, {
    variables: { includeReviews: true }, 
  });
  refetch()
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;


  const handleDelete = async (review) => {
    console.log("delete", review)
    console.log("delete", review.id)
    try {
      await deleteReview({ variables: { deleteReviewId: review.id } });
      refetch()
  } catch (error) {
    console.error('Failed to delete review', error);
  }

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { deleteReviewId: review.id } });
              refetch()
            } catch (error) {
              console.error('Failed to delete review', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleViewRepository = (id) => {
    navigate(`/repository/${id}`);
  };


  const user = data.me;
  const reviews = user.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View style={styles.columnContainer}>
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
        <View style={styles.buttonContainer}>
            <Pressable onPress={() => handleViewRepository(item.repository.id)} style={styles.viewButton}>
                <Text color='white'>{"View Repository"}</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item)} style={styles.deleteButton}>
                <Text color='white'>{"Delete Review"}</Text>
            </Pressable>
            </View>
        </View>
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => ( <View style={{ height: 10, backgroundColor: 'transparent', }}/> )}
    />
  );
};

export default MyReviews;






