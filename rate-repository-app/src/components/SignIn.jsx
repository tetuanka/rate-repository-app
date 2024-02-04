import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
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
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();
  
    const onSubmit = async (values) => {
      const { username, password } = values;
  
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
    };
  

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
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
            <Pressable onPress={handleSubmit} testID="submitButton">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

