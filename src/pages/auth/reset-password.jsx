import { Button } from 'flowbite-react';
import React from 'react';
import { CustomInput } from '../../components';
import { PiCashRegisterThin } from 'react-icons/pi';
import useCustomForm from '../../hooks/useCustomForm';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PasswordStrength from '../../components/common/PasswordStrength';
import axiosInstance from '../../utils/AxiosInstance';

function ResetPasswordPage() {
  const naigate = useNavigate();
  // Token extract from the URL
  // http://localhost:5173/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYmFtYXhvYzQyOUBtb3RpdnVlLmNvbSIsImlkIjoiNjdlODYwM2M5NjYwNjE3ZjVhMDQyYjJhIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzQzMjgyODE2LCJleHAiOjE3NDMyODI4NzZ9.yw4PnWLO7N9QzW7zh8OkF9zqAWLZq4QD7mOeCczO_KU

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  console.log(token, 'from location');
  let initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Must be atleast 6 character')
      .required('Password is Required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match'
    ),
  });

  const onSubmit = async (values) => {
    const response = await axiosInstance.post('reset-password', values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      naigate('/login');
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);
  console.log(formik.values, 'from formik values in lue 37');
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <PiCashRegisterThin className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Reset Password</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md flex-col gap-4"
      >
        <div>
          <CustomInput
            label={'Password'}
            type="password"
            onBlur={formik.handleBlur}
            name="password"
            onChange={formik.handleChange}
            placeholder="password"
            errors={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <CustomInput
            label={'Repeat Password'}
            type="password"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="password"
            errors={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>
        <PasswordStrength value={formik.values.password} />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default ResetPasswordPage;
