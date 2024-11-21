import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // to extract params from the URL
import axios from 'axios'; // for making HTTP requests

const EmailVerification = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [isVerified, setIsVerified] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Call the backend API to verify the email
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://backend-xl0o.onrender.com/verify-email/${token}`);
        if (response.data.success) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerified(false);
        setErrorMessage('An error occurred during email verification. Please try again.');
      }
    };

    // Trigger the email verification when the component is mounted
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      {isVerified === null ? (
        <p>Verifying email...</p>
      ) : isVerified ? (
        <p>Email verified successfully!</p>
      ) : (
        <p>{errorMessage || 'Failed to verify email. Please check the link and try again.'}</p>
      )}
    </div>
  );
};

export default EmailVerification;
