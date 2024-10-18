import React from 'react';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../../config/firebase';

const LoginGoogle = ({ onGoogleLogin }) => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (onGoogleLogin) {
        onGoogleLogin(user); // Gọi hàm xử lý từ SignIn.js khi Google login thành công
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return <GoogleButton onClick={handleGoogleSignIn} />;
};

export default LoginGoogle;
