import React, { useState } from 'react';
import { Save, Lock, Bell, Moon, Sun, Globe } from 'lucide-react';
import InstructorLayout from './InstructorLayout';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, showToast } from '../../store/uiSlice';
import { RootState } from '../../store';
import { authService } from '../../services/auth';

const InstructorSettingsPage: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.ui);
    const { user } = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        browser: true,
        marketing: false
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call for other settings
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        dispatch(showToast({ message: 'Settings saved successfully', type: 'success' }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitPasswordChange = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            dispatch(showToast({ message: 'Please fill in all password fields', type: 'error' }));
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            dispatch(showToast({ message: 'New passwords do not match', type: 'error' }));
            return;
        }

        setPasswordLoading(true);
        try {
            await authService.changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
                confirmPassword: passwordForm.confirmPassword
            });
            dispatch(showToast({ message: 'Password changed successfully', type: 'success' }));
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error: any) {
            console.error('Change password error:', error);
            const message = error?.response?.data?.message || 'Failed to change password. Please check your current password.';
            dispatch(showToast({ message, type: 'error' }));
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <InstructorLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage your account preferences</p>
                </div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white">
                            <Moon className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Appearance</h2>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Theme Preference</p>
                                <p className="text-sm text-slate-500">Switch between light and dark modes</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => dispatch(toggleTheme())}
                                leftIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            >
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </Button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white">
                            <Bell className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                                    <p className="text-sm text-slate-500">Receive daily summaries and alerts</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications.email}
                                        onChange={e => setNotifications({ ...notifications, email: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Browser Push</p>
                                    <p className="text-sm text-slate-500">Get real-time updates on your dashboard</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifications.browser}
                                        onChange={e => setNotifications({ ...notifications, browser: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Security - Change Password */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white">
                            <Lock className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Security</h2>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordForm.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Current password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordForm.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="New password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordForm.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        onClick={submitPasswordChange}
                                        isLoading={passwordLoading}
                                        variant="outline"
                                        className="mt-2"
                                    >
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSave} isLoading={loading} leftIcon={<Save size={18} />}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
};

export default InstructorSettingsPage;
