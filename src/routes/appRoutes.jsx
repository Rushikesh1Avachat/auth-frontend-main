import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import {
  AdminDashboard,
  AdminProfile,
  AuthLayout,
  ForgetPasswordPage,
  HomePage,
  LoginPage,
  PageNotFound,
  RegisterPage,
  ResetPasswordPage,
  UserLayout,
  UserProfile,
  VerifyOTPPage,
  VerifyPhoneOtpPage,
} from '../pages';
import ProtectedRoutes from './protectedRoutes';
import Unauthorize from '../pages/Unauthorize';
import VerifyPhoneOtp from '../pages/auth/verifyPhone';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOTPPage />} />
          <Route path="verify-phone-otp" element={<VerifyPhoneOtpPage />} />
        </Route>

        {/* User Private Routes */}
        <Route element={<ProtectedRoutes allowedRoles={['admin', 'user']} />}>
          <Route element={<UserLayout />}>
            <Route path="user-profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* User Private Routes Admin */}
        <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route element={<UserLayout />}>
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Page Not Found */}
        <Route path="unauthorize" element={<Unauthorize />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;