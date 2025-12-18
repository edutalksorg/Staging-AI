import React, { useState, useEffect } from 'react';
import {
    Plus,
    X,
    Users,
    Shield
} from 'lucide-react';
import SuperAdminLayout from '../../components/SuperAdminLayout';
import Button from '../../components/Button';
import { adminService } from '../../services/admin';

const AdminManagementPage: React.FC = () => {
    const [admins, setAdmins] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'admin'
    });

    const [responsibilities, setResponsibilities] = useState({
        manage_users: true,
        approve_instructors: true,
        manage_finance: false,
        system_settings: false,
        content_moderation: true
    });

    useEffect(() => {
        loadAdmins();
    }, []);

    const loadAdmins = async () => {
        try {
            setLoading(true);
            const data = await adminService.getAdmins();
            setAdmins(data);
        } catch (err) {
            console.error('Failed to load admins', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                responsibilities: Object.keys(responsibilities).filter(k => responsibilities[k as keyof typeof responsibilities])
            };

            console.log('Creating Admin:', payload);
            // await adminService.createAdmin(payload); // Uncomment when backend is ready

            // Simulating success for UI demo
            setAdmins([...admins, {
                id: Date.now().toString(),
                fullName: formData.fullName,
                email: formData.email,
                role: 'admin',
                responsibilities: payload.responsibilities,
                createdAt: new Date().toISOString()
            }]);

            setIsCreating(false);
            setFormData({ fullName: '', email: '', password: '', role: 'admin' });
            alert('Admin Created Successfully (Simulation)');
        } catch (err) {
            console.error('Error creating admin:', err);
            alert('Failed to create admin');
        }
    };

    return (
        <SuperAdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Management</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage administrator accounts and their specialized access controls</p>
                </div>
                <Button onClick={() => setIsCreating(true)} leftIcon={<Plus size={18} />}>
                    Create New Admin
                </Button>
            </div>

            {isCreating && (
                <div className="mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Admin Account</h3>
                                <p className="text-sm text-slate-500">Add a new system administrator</p>
                            </div>
                        </div>
                        <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleCreateAdmin} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Temporary Password</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                                <p className="text-xs text-slate-500 mt-1">They will be asked to change this on first login.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                Assign Responsibilities
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(responsibilities).map(([key, value]) => (
                                    <label key={key} className={`
                                        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                                        ${value
                                            ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800'
                                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                    `}>
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => setResponsibilities(prev => ({ ...prev, [key as keyof typeof responsibilities]: !value }))}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize select-none">
                                            {key.replace('_', ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="secondary" type="button" onClick={() => setIsCreating(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Create Administrator
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Administrator</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Responsibilities</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Added</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading administrators...</td></tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                                                <Users className="text-slate-400" size={24} />
                                            </div>
                                            <p className="text-slate-500 font-medium">No other administrators found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                                    {admin.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">{admin.fullName}</p>
                                                    <p className="text-xs text-slate-500">{admin.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2 max-w-sm">
                                                {admin.responsibilities?.map((resp: string) => (
                                                    <span key={resp} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-wide">
                                                        {resp.replace('_', ' ')}
                                                    </span>
                                                )) || <span className="text-slate-400 text-xs italic">Reviewing All</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors">
                                                Edit Access
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default AdminManagementPage;
