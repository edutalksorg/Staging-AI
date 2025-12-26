import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import { authService } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/uiSlice';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await authService.forgotPassword(data.email);

      // Backend returned success (example: { data: true, succeeded: true })
      dispatch(
        showToast({
          message: 'If this email is registered, a password reset link has been sent.',
          type: 'success',
        })
      );

      // Optionally navigate to login
      navigate('/login');
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message || t('auth.failedToRequestPasswordReset');
      dispatch(showToast({ message: serverMessage, type: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            {t('auth.forgotPasswordTitle')}
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            {t('auth.forgotPasswordDesc')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                {t('auth.emailLabel')}
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder={t('auth.enterEmail')}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
              {t('auth.sendResetLink')}
            </Button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            {t('auth.remembered')}{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              {t('landing.nav.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
