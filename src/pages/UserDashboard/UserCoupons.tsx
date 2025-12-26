import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import { couponsService } from '../../services/coupons';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/uiSlice';
import type { ValidateCouponResponse } from '../../types';

const UserCoupons: React.FC = () => {
    const dispatch = useDispatch();
    const [validateCode, setValidateCode] = useState('');
    const [validating, setValidating] = useState(false);
    const [validationResult, setValidationResult] = useState<ValidateCouponResponse | null>(null);
    const [validationError, setValidationError] = useState<string>('');

    const { t } = useTranslation();

    const handleValidate = async () => {
        if (!validateCode.trim()) {
            dispatch(showToast({ message: t('couponsPage.enterCode'), type: 'error' }));
            return;
        }

        try {
            setValidating(true);
            setValidationError('');
            setValidationResult(null);

            // Validate coupon without specific amount (just check if code exists and is active)
            const response = await couponsService.validate({
                couponCode: validateCode.toUpperCase(),
                amount: 0, // Pass 0 to just validate existence
                itemType: 'Plan',
                itemId: '', // Empty for general validation
            });

            const couponData = (response as any)?.data || response;

            if (couponData && couponData.isValid) {
                setValidationResult(couponData);
                setValidationError('');
                dispatch(showToast({
                    message: t('couponsPage.validMessage', { code: validateCode.toUpperCase() }),
                    type: 'success'
                }));
            } else {
                setValidationResult(null);
                const errorMsg = couponData?.message || t('couponsPage.invalidMessage');
                setValidationError(errorMsg);
                dispatch(showToast({ message: errorMsg, type: 'error' }));
            }
        } catch (error: any) {
            console.error('Validation error:', error);
            setValidationResult(null);
            const errorMsg = error.response?.data?.message ||
                error.response?.data?.messages?.[0] ||
                error.message ||
                t('couponsPage.invalidMessage');
            setValidationError(errorMsg);
            dispatch(showToast({ message: errorMsg, type: 'error' }));
        } finally {
            setValidating(false);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="max-w-xl mx-auto space-y-4">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">
                        {t('couponsPage.title')}
                    </h2>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={validateCode}
                                onChange={(e) => setValidateCode(e.target.value.toUpperCase())}
                                placeholder={t('couponsPage.checkCode')}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase placeholder:normal-case"
                                onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
                            />
                        </div>
                        <Button
                            onClick={handleValidate}
                            isLoading={validating}
                            disabled={!validateCode.trim()}
                            className="min-w-[120px]"
                        >
                            {t('couponsPage.validate')}
                        </Button>
                    </div>

                    {validationResult && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-full">
                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-green-900 dark:text-green-100">
                                        {t('couponsPage.valid')}
                                    </h4>
                                    <div className="mt-1 space-y-1 text-sm text-green-800 dark:text-green-200">
                                        <p>{t('couponsPage.discount')}: <span className="font-medium">
                                            {validationResult.discountType === 'Percentage'
                                                ? `${validationResult.discountValue}%`
                                                : `₹${validationResult.discountValue}`}
                                        </span></p>
                                        {(validationResult.minPurchaseAmount ?? 0) > 0 && (
                                            <p>{t('couponsPage.minPurchase')}: ₹{validationResult.minPurchaseAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                    <Tag size={32} className="text-pink-500 flex-shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('couponsPage.howToUse')}</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li>• {t('couponsPage.step1')}</li>
                            <li>• {t('couponsPage.step2')}</li>
                            <li>• {t('couponsPage.step3')}</li>
                            <li>• {t('couponsPage.step4')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCoupons;
