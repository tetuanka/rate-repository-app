import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
  username: yup
  .string()
  .required('Username is required')
  .min(5, 'Username must be at least 5 characters')
  .max(30, 'Username must be at most 30 characters'),
password: yup
  .string()
  .required('Password is required')
  .min(5, 'Password must be at least 5 characters')
  .max(50, 'Password must be at most 50 characters'),
passwordconfirmation: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required('Password confirmation is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signUp({ username, password });

      if (response.data) {
        

        try {
            const response = await signIn({ username, password });
      
            if (response.data && response.data.authenticate) {
              console.log("data:", response.data);
              console.log(username, password);
              navigate('/');
            }
          } catch (e) {
            console.log(e);
          }


      }
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '', passwordconfirmation: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput style={styles.input}
              name="username"
              placeholder="Username"
              testID="usernameField"
            />
            <FormikTextInput style={styles.input}
              name="password"
              placeholder="Password"
              secureTextEntry
              testID="passwordField"
            />
            <FormikTextInput style={styles.input}
              name="passwordconfirmation"
              placeholder="Password confirmation"
              secureTextEntry
              testID="passwordconfirmationField"
            />
            <Pressable onPress={handleSubmit} testID="submitButton">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;