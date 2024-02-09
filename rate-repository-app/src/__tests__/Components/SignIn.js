import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);

      // Get the username and password fields and the submit button
      const usernameField = getByPlaceholderText('Username');
      const passwordField = getByPlaceholderText('Password');
      const submitButton = getByText('Sign In');

      // Fill the text inputs
      fireEvent.changeText(usernameField, 'kalle');
      fireEvent.changeText(passwordField, 'password');

      // Press the submit button
      fireEvent.press(submitButton);

      // Wait for the onSubmit function to be called
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});