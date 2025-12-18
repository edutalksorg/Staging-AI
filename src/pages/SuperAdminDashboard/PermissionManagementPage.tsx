import React, { useEffect, useState } from 'react';
import { Search, Loader, Filter, CheckCircle, Database } from 'lucide-react';
import SuperAdminLayout from '../../components/SuperAdminLayout';
import { permissionService, Permission } from '../../services/permissionService';

const PermissionManagementPage: React.FC = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [moduleFilter, setModuleFilter] = useState<string>('all');

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        try {
            setLoading(true);
            const res = await permissionService.getAllPermissions();
            const data = (res as any)?.data || res || [];
            if (Array.isArray(data)) {
                setPermissions(data);
            } else {
                console.error("Unexpected permissions data format", data);
                setPermissions([]);
            }
        } catch (error) {
            console.error("Failed to load permissions", error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique modules for filter
    const modules = Array.from(new Set(permissions.map(p => p.module))).sort();

    const filteredPermissions = permissions.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.module.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesModule = moduleFilter === 'all' || p.module === moduleFilter;

        return matchesSearch && matchesModule;
    });

    return (
        <SuperAdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Permission Registry</h1>
                    <p className="text-slate-600 dark:text-slate-400">View and audit all system permissions definitions</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                        Total: {permissions.length}
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search permissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={moduleFilter}
                        onChange={(e) => setModuleFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                    >
                        <option value="all">All Modules</option>
                        {modules.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Permissions List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <Loader className="animate-spin text-indigo-600" size={32} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Permission Name</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Display Name</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Module</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredPermissions.map((perm) => (
                                    <tr key={perm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                                                {perm.name}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {perm.displayName}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                                <Database size={12} />
                                                {perm.module}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {perm.action}
                                        </td>
                                    </tr>
                                ))}
                                {filteredPermissions.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                            No permissions found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </SuperAdminLayout>
    );
};

export default PermissionManagementPage;
