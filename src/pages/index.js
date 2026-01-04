// Public Pages
export { default as HomePage } from './Home';
export { default as PageNotFound } from './PageNotFound';

// Auth Pages
export { default as LoginPage } from './auth/login';
export { default as AuthLayout } from './auth/AuthLayout';
export { default as RegisterPage } from './auth/register';
export { default as ForgetPasswordPage } from './auth/forget-password';
export { default as ResetPasswordPage } from './auth/reset-password';
export { default as VerifyOTPPage } from './auth/verifyEmail';
export { default as VerifyPhoneOtpPage } from './auth/verifyPhone';

// Authenticated Layoutss
export { default as UserLayout } from './userLayout';

// User Pages
export { default as UserProfile } from './userDashboard/userProfile';

// Admin Pages
export { default as AdminProfile } from './adminDashboard/AdminProfile';
export { default as AdminDashboard } from './adminDashboard/dashboard';
