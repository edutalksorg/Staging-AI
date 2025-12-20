import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { authService } from '../services/auth';
import { STORAGE_KEYS } from '../constants';
import { logout } from '../store/authSlice';

/**
 * Hook to automatically refresh access tokens before they expire
 * Token lifetime: 3600 seconds (1 hour)
 * Refresh time: 55 minutes (5 minutes before expiry)
 */
export const useTokenRefresh = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);
    const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!token) {
            // Clear any existing timer if user logs out
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
                refreshTimerRef.current = null;
            }
            return;
        }

        // Token expires in 3600 seconds (1 hour)
        // Refresh 5 minutes (300 seconds) before expiry
        const TOKEN_LIFETIME = 3600 * 1000; // 1 hour in ms
        const REFRESH_BEFORE = 300 * 1000; // 5 minutes in ms
        const refreshTime = TOKEN_LIFETIME - REFRESH_BEFORE; // 55 minutes

        const scheduleRefresh = () => {
            // Clear any existing timer
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }

            console.log(`⏰ Token refresh scheduled in ${refreshTime / 1000 / 60} minutes`);

            refreshTimerRef.current = setTimeout(async () => {
                try {
                    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

                    if (!refreshToken) {
                        console.warn('⚠️ No refresh token available, logging out');
                        dispatch(logout());
                        return;
                    }

                    console.log('🔄 Refreshing token automatically...');
                    const response: any = await authService.refreshToken(refreshToken);

                    // Handle various response structures
                    const newAccessToken = response?.accessToken || response?.data?.accessToken || response?.token;
                    const newRefreshToken = response?.refreshToken || response?.data?.refreshToken;

                    if (newAccessToken) {
                        localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
                        if (newRefreshToken) {
                            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
                        }

                        console.log('✅ Token refreshed automatically');

                        // Schedule next refresh
                        scheduleRefresh();
                    } else {
                        console.error('❌ No access token in refresh response');
                        dispatch(logout());
                    }
                } catch (error) {
                    console.error('❌ Auto token refresh failed:', error);
                    dispatch(logout());
                }
            }, refreshTime);
        };

        // Start the refresh schedule
        scheduleRefresh();

        // Cleanup on unmount or token change
        return () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
                refreshTimerRef.current = null;
            }
        };
    }, [token, dispatch]);
};
