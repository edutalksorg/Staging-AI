import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLanguage } from '../../store/uiSlice';
import { Globe, Check } from 'lucide-react';

import { LANGUAGES } from '../../constants/languages';

export const LanguageSelector: React.FC = () => {
    const dispatch = useDispatch();
    const { language } = useSelector((state: RootState) => state.ui);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: string) => {
        dispatch(setLanguage(code));
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2"
                title="Select Language"
            >
                <Globe size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Language
                        </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">{lang.name}</span>
                                        <span className="text-xs text-slate-500">{lang.nativeName}</span>
                                    </div>
                                </span>
                                {language === lang.code && (
                                    <Check size={16} className="text-blue-600 dark:text-blue-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
