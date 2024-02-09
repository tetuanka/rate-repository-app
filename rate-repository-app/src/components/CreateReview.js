import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations'
import { GET_REVIEWS } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object().shape({
    ownername: yup
      .string()
      .required('Repository owner name is required'),
    repositoryname: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating must be at most 100'),
  });





  const CreateReview = () => {
    const navigate = useNavigate();
    const [createReview] = useMutation(CREATE_REVIEW);
    const { fetchMore } = useQuery(GET_REVIEWS, {
        variables: { repositoryId: '' } // Aseta aluksi arvo nulliksi
    });

    const onSubmit = async (values) => {

        const { ownername, repositoryname, rating, review } = values;
        console.log(ownername, repositoryname, rating, review)
        try {

          const response = await createReview({
            variables: {
                repositoryName: values.repositoryname,
                ownerName: values.ownername,
                rating: parseInt(values.rating),
                text: values.review || '',
                },
          });
          console.log(response.data)
          console.log('Review created:', response.data.createReview);
          if (response.data.createReview) {
            await fetchMore({
                variables: { repositoryId: response.data.createReview.repositoryId }
            });
            navigate(`/repository/${response.data.createReview.repositoryId}`);
          } else {
            console.error('Error creating review: Review data not found');
          }
        } catch (error) {
          console.error('Error creating review:', error);
        }
      };
  

  

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ ownername: '', repositoryname: '', rating: '', review: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="ownername"
              placeholder="Repository owner name"
              testID="ownernameField"
            />
            <FormikTextInput
              name="repositoryname"
              placeholder="Repository name"
              testID="repositorynameField"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              testID="ratingField"
            />
            <FormikTextInput
              name="review"
              placeholder="Review"
              testID="reviewField"
            />
            <Pressable onPress={handleSubmit} testID="submitButton">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Create a review</Text>
              </View>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;

