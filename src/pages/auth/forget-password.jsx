import { Button } from 'flowbite-react';
import React from 'react';
import { SiFusionauth } from 'react-icons/si';
import { CustomInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from '../../utils/AxiosInstance';
import useCustomForm from '../../hooks/useCustomForm';

function ForgetPasswordPage() {
  const naigate = useNavigate();
  let initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
  });

  const onSubmit = async (values) => {
    const response = await axiosInstance.post('/forget-password', values);
    if (response.status === 201) {
      naigate('/reset-password');
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Forget Password</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md flex-col gap-4"
      >
        <div>
          <CustomInput
            label={'Email'}
            type="email"
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
            placeholder="example@gmail.com"
            errors={formik.touched.email && formik.errors.email}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <div className="text-center pt-5">
        <span>
          You don't have account ? <Link to="/login">Sign in</Link>
        </span>
      </div>
    </>
  );
}

export default ForgetPasswordPage;
