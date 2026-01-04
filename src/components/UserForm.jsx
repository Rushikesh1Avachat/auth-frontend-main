import React, { useState } from 'react';
import CustomInput from './common/CustomInput';
import { Button, Card, Label, Select } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth';
import useCustomForm from '../hooks/useCustomForm';
import axiosInstance from '../utils/AxiosInstance';
import * as Yup from 'yup';
import PasswordStrength from './common/PasswordStrength';

const UserForm = ({ userData, source, fetchUsers, handleClose }) => {
  const { user, updateUser } = useAuth();
  const [isPassword, setIsPassword] = useState(false);
  let initialValues = !isPassword
    ? source === 'admin'
      ? {
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || 'user',
        }
      : {
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
        }
    : {
        password: '',
        confirm_password: '',
        isPassword: true,
      };

  const validationSchema = !isPassword
    ? Yup.object({
        username: Yup.string().required('Username is Required'),
      })
    : Yup.object({
        password: Yup.string()
          .min(6, 'Must be atleast 6 character')
          .required('Password is Required'),
        confirm_password: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Password must match'
        ),
      });

  const onSubmit = async (values) => {
    if (source === 'admin') {
      const response = await axiosInstance.post('update-user', values);
      fetchUsers();
      handleClose();
      return response;
    }
    const response = await axiosInstance.post('/user/profile', values);
    updateUser(response.data.data);
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);
  return (
    <Card className="flex-1">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button
          pill
          outline
          size="xs"
          className="outline"
          onClick={() => setIsPassword(!isPassword)}
        >
          Change Password
        </Button>
      </div>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={formik.handleSubmit}
      >
        {!isPassword ? (
          <>
            <div>
              <CustomInput
                label={'Username'}
                type="text"
                onChange={formik.handleChange}
                name="username"
                onBlur={formik.handleBlur}
                placeholder="jhon st."
                value={formik.values.username || ''}
                errors={formik.touched.username && formik.errors.username}
              />
            </div>
            <div>
              <CustomInput
                label={'Email'}
                onBlur={formik.handleBlur}
                type="email"
                disabled
                onChange={formik.handleChange}
                name="email"
                placeholder="example@gmil.com"
                value={formik.values.email || ''}
                errors={formik.touched.email && formik.errors.email}
              />
            </div>
            <div>
              <CustomInput
                label={'Phone'}
                onBlur={formik.handleBlur}
                type="phone"
                onChange={formik.handleChange}
                name="phone"
                value={formik.values.phone || ''}
                placeholder="98...."
                errors={formik.touched.email && formik.errors.email}
              />
            </div>
            {source === 'admin' ? (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="role">Select Role</Label>
                </div>
                <Select
                  onChange={formik.handleChange}
                  name="role"
                  value={formik.values.role || ''}
                  id="role"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div>
              <CustomInput
                name="password"
                value={formik.values.password || ''}
                errors={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                label={'Password'}
              />
            </div>
            <div>
              <CustomInput
                name="confirm_password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirm_password || ''}
                errors={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                label={'Repeat Password'}
              />
            </div>
            <PasswordStrength value={formik.values.password} />
          </>
        )}

        {/* passwords Field */}

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default UserForm;
