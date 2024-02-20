import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useReviews } from '../hooks/useReviews';
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

const RepositoryInfo = () => {
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id }
    });
    if (loading) {
        return null;
        }
    if (error) {
        console.error("Error fetching repository data:", error);
    }

    return (
        <View>
        <RepositoryItem item={data.repository} showButton={true}></RepositoryItem>
        </View>
    );
};

const formattedDate = (datetime) => {
    const date = new Date(datetime);
    const day = ('0' + date.getDate()).slice(-2); // Päivä kaksinumeroisena
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Kuukausi kaksinumeroisena
    const year = date.getFullYear(); // Vuosi nelinumeroisena

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}
  
const ReviewItem = ({ review }) => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{`${review.rating}`}</Text>
            </View>
            <View style={[styles.flexContainer3, { width: '90%' }]}>
                <Text marginBottom="primary" fontWeight="bold">{`${review.user.username}`}</Text>
                <Text marginBottom="primary" color="textSecondary">{`${formattedDate(review.createdAt)}`}</Text>
                <Text style={styles.reviewText} marginBottom="primary">{review.text}</Text>

            </View>
        </View>
    );
};
  

const RepositoryView = () => {
    const { id } = useParams();
    const { reviews, fetchMore } = useReviews(id)

    
    const onEndReach = () => {
      fetchMore()
    };

      
    

  
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => ( <View style={{ height: 10, backgroundColor: 'transparent', }}/> )}
        ListHeaderComponent={() => <RepositoryInfo />}
        ListHeaderComponentStyle={{ marginBottom: 10 }}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  };
  
  export default RepositoryView;





