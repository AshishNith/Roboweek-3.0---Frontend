import React from 'react';
import { signInWithGoogle } from '../services/auth';
import Button from './Button';

const GoogleSignInButton: React.FC = () => {
  const handleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      text="Sign in with Google"
      textSize="text-lg"
      iconLink={<i className="ri-google-fill text-2xl"></i>}
    />
  );
};

export default GoogleSignInButton;