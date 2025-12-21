import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { callsService } from '../../services/calls';
import { signalRService } from '../../services/signalr';
import agoraService from '../../services/agora';
import {
    endCall,
    setCallStatus,
} from '../../store/callSlice';
import IncomingCallModal from './IncomingCallModal';
import ActiveCallOverlay from './ActiveCallOverlay';
import CallingModal from './CallingModal';
import { callLogger } from '../../utils/callLogger';

const CallManager: React.FC = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const { callState, currentCall, isMuted } = useSelector((state: RootState) => state.call);

    // Refs for Agora
    const incomingAudioRef = useRef<HTMLAudioElement | null>(null);
    const isJoiningChannel = useRef<boolean>(false);

    // Log state changes for debugging
    useEffect(() => {
        callLogger.stateTransition('previous', callState, currentCall?.callId);
    }, [callState, currentCall?.callId]);

    useEffect(() => {
        if (currentCall) {
            callLogger.debug('Current call updated', {
                callId: currentCall.callId,
                status: currentCall.status,
                callerName: currentCall.callerName,
                calleeName: currentCall.calleeName
            });
        }
    }, [currentCall]);

    useEffect(() => {
        callLogger.debug(`Mute state: ${isMuted ? 'MUTED' : 'UNMUTED'}`);
