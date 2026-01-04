import { Button } from 'flowbite-react';
import React from 'react';
import { CustomInput } from '../../components';
import { PiCashRegisterThin } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import * as Yup from 'yup';
import PasswordStrength from '../../components/common/PasswordStrength';
import axiosInstance from '../../utils/AxiosInstance';

function RegisterPage() {
  const navigate = useNavigate();
  let initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Is Required'),
    password: Yup.string()
      .min(6, 'Must be atleast 6 character')
      .required('Password is Required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match'
    ),
  });

  const onSubmit = async (values) => {
    const response = await axiosInstance.post('/register', values);
    console.log(response, "from the response");
    
    if (response.status === 201) {
      navigate('/login');
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  console.log(formik, formik.values.password, 'from the formiuk');
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <PiCashRegisterThin className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Register</h1>
      </div>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <CustomInput
            label={'Username'}
            type="text"
            onChange={formik.handleChange}
            name="username"
            onBlur={formik.handleBlur}
            placeholder="jhon st."
            errors={formik.touched.username && formik.errors.username}
          />
        </div>
        <div>
          <CustomInput
            label={'Email'}
            onBlur={formik.handleBlur}
            type="email"
            onChange={formik.handleChange}
            name="email"
            placeholder="example@gmil.com"
            errors={formik.touched.email && formik.errors.email}
          />
        </div>
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
            type="Confirm Password"
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
      <div className="text-center pt-5">
        <span>
          You already have account ? <Link to="/login">Sign in</Link>
        </span>
      </div>
    </>
  );
}

export default RegisterPage;
