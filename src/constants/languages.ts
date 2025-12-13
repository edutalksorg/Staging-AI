export interface Language {
    code: string;
    name: string;
    nativeName: string; // Name in its own script
    flag: string; // Emoji
}

export const LANGUAGES: Language[] = [
    { code: 'English', name: 'English', nativeName: 'English', flag: '🇬🇧' }, // Using GB/US flag or generic
    { code: 'Hindi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'Bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'Telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'Marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'Tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'Urdu', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
    { code: 'Gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'Kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'Odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'Malayalam', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'Punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'Assamese', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'Maithili', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳' },
    { code: 'Sanskrit', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' }
];

export const DEFAULT_LANGUAGE = 'English';
