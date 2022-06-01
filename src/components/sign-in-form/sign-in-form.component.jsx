import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      alert('you must enter an email and password')
      return
    }

    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.error(error)
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password' 
          type='password' 
          required 
          onChange={handleChange} 
          name='password' 
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
 
      </form>

    </SignInContainer>
  )
}

export default SignInForm;