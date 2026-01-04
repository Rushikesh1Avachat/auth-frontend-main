import React, { useRef } from 'react';
import OtpForm from './OtpForm';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const PhoneOtp = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const getTheOtp = () => {
    let Otp = inputsRef.current?.map((item) => item.value);
    console.log(Otp);
    
    return Otp.join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/verify-phone', {
        otp: await getTheOtp(),
        userId: window.location.href.split('=')[1],
      });
      console.log(response);
      
      updateUser(response.data);
      toast.success('Phone Verified Success');
      navigate('/user-profile');
    } catch (error) {
      console.log(error, 'from email verification ');
    }
  };
  return (
    <div>
      <OtpForm
        title="Verify Phone By OTP"
        inputsRef={inputsRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PhoneOtp;