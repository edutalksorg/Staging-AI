import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneOff, Mic, MicOff } from 'lucide-react';
import { RootState } from '../../store';
import { toggleMute, endCall, updateDuration } from '../../store/callSlice';
import { callsService } from '../../services/calls';
import { signalRService } from '../../services/signalr';

const ActiveCallOverlay: React.FC = () => {
    const dispatch = useDispatch();
    const { currentCall, callState, isMuted, durationSeconds, isCallActive } = useSelector((state: RootState) => state.call);
    // We only show this if we are connecting or in an active call
    const shouldShow = ['connecting', 'active', 'ringing'].includes(callState) || isCallActive;

    // Local state for formatting time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (callState === 'active') {
            interval = setInterval(() => {
                dispatch(updateDuration(durationSeconds + 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callState, durationSeconds, dispatch]);

    if (!shouldShow || !currentCall) return null;

    const handleEndCall = async () => {
        try {
            await callsService.end(currentCall.callId, 'User ended call');
            await signalRService.leaveCallSession(currentCall.callId);
        } catch (error) {
            console.error('Error ending call:', error);
        } finally {
            dispatch(endCall());
        }
    };

    const handleToggleMute = async () => {
        // Determine the new state logic first
        // Note: The actual media stream muting is handled in the CallManager usually, 
        // but we toggle the UI state here. We should also invoke the API if needed for stats.
        if (isMuted) {
            await callsService.unmute(currentCall.callId).catch(console.warn);
        } else {
            await callsService.mute(currentCall.callId).catch(console.warn);
        }
        dispatch(toggleMute());
    };

    const getStatusText = () => {
        if (callState === 'ringing') return 'Ringing...';
        if (callState === 'connecting') return 'Connecting...';
        return formatTime(durationSeconds);
    };

    return (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-72 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 transition-all">
                {/* Header / Remote User */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                        {currentCall.calleeAvatar || currentCall.callerAvatar ? (
                            <img
                                src={currentCall.calleeId === 'Me' ? currentCall.callerAvatar : currentCall.calleeAvatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-bold">
                                {(currentCall.calleeName || currentCall.callerName || '?').charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                            {currentCall.calleeId === 'Me' ? currentCall.callerName : currentCall.calleeName}
                        </h4>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium animate-pulse">
                            {getStatusText()}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-around w-full px-2">
                    {/* Mute Toggle */}
                    <button
                        onClick={handleToggleMute}
                        className={`p-3 rounded-full transition-colors ${isMuted
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200'
                            }`}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    {/* End Call */}
                    <button
                        onClick={handleEndCall}
                        className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-red-900/40 transform transition-transform active:scale-95"
                        title="End Call"
                    >
                        <PhoneOff size={28} className="fill-current" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActiveCallOverlay;
