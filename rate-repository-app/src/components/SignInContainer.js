import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';


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
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  export const SignInContainer = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <FormikTextInput
                style={styles.input}
                name="username"
                placeholder="Username"
                testID="usernameField"
              />
              <FormikTextInput
                style={styles.input}
                name="password"
                placeholder="Password"
                secureTextEntry
                testID="passwordField"
              />
              <Pressable onPress={handleSubmit}>
                <View testID="submitButton" style={styles.button}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </View>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    );
  };
  
  export default SignInContainer;