import { Button, Checkbox, Label } from 'flowbite-react';
import React from 'react';
import { SiFusionauth } from 'react-icons/si';
import { CustomInput } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import axiosInstance from '../../utils/AxiosInstance';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

function LoginPage() {
  const naigate = useNavigate();
  const { login } = useAuth();
  let initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is Required'),
    password: Yup.string()
      .min(6, 'Must be atleast 6 character')
      .required('Password is Required'),
  });

  const onSubmit = async (values) => {
    if (values.username.includes('@')) {
      values.email = values.username;
      delete values.username;
    }
    const response = await axiosInstance.post('/login', values);

    if (response.status === 201) {
      login(response.data);
      naigate('/');
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Login</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md flex-col gap-4"
      >
        <div>
          <CustomInput
            label={'Username or Email'}
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
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link to="/forget-password" className="text-cyan-700 text-sm">
              Forget Password
            </Link>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <div className="text-center pt-5">
        <span>
          You don't have account ? <Link to="/register">Sign up</Link>
        </span>
      </div>
    </>
  );
}

export default LoginPage;
