import * as signalR from '@microsoft/signalr';
import { store } from '../store';
import {
    setSignalRConnected,
    setIncomingInvitation,
    CallInvitationEvent,
    acceptCall,
    setCallStatus,
    endCall,
    updateDuration
} from '../store/callSlice';

// Event types based on the spec
export interface IceCandidatePayload {
    candidate: string;
    sdpMid: string;
    sdpMLineIndex: number;
}

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private token: string | null = null;
    private isConnecting = false;

    public setToken(token: string) {
        this.token = token;
    }

    public async connect(hubUrl: string): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return;
        }

        if (this.isConnecting) return;

        this.isConnecting = true;

        try {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl, {
                    accessTokenFactory: () => this.token || '',
                    // Revert skipNegotiation to false to allow sticky sessions/cookies via direct URL
                    // skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
                .configureLogging(signalR.LogLevel.Warning)
                .build();

            // Register event handlers before starting
            this.registerHandlers();

            await this.connection.start();
            console.log('[SignalR] Connected successfully');
            store.dispatch(setSignalRConnected(true));
        } catch (err) {
            console.error('[SignalR] Connection failed', err);
            store.dispatch(setSignalRConnected(false));
            throw err;
        } finally {
            this.isConnecting = false;
        }
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
            store.dispatch(setSignalRConnected(false));
        }
    }

    // --- Hub Methods (Client -> Server) ---

    public async joinCallSession(callId: string): Promise<void> {
        await this.invoke('JoinCallSession', callId);
    }

    public async leaveCallSession(callId: string): Promise<void> {
        await this.invoke('LeaveCallSession', callId);
    }

    public async sendOffer(callId: string, sdpOffer: string): Promise<void> {
        await this.invoke('SendOffer', callId, sdpOffer);
    }

    public async sendAnswer(callId: string, sdpAnswer: string): Promise<void> {
        await this.invoke('SendAnswer', callId, sdpAnswer);
    }

    public async sendIceCandidate(callId: string, candidate: IceCandidatePayload): Promise<void> {
        await this.invoke('SendIceCandidate', callId, candidate);
    }

    public async notifyCallActive(callId: string): Promise<void> {
        await this.invoke('NotifyCallActive', callId);
    }

    private async invoke(methodName: string, ...args: any[]): Promise<void> {
        if (!this.connection || this.connection.state !== signalR.HubConnectionState.Connected) {
            console.warn(`[SignalR] Cannot invoke ${methodName}: Disconnected`);
            return;
        }
        try {
            await this.connection.invoke(methodName, ...args);
        } catch (err) {
            console.error(`[SignalR] Error invoking ${methodName}:`, err);
            throw err;
        }
    }

    // --- Event Handlers (Server -> Client) ---

    private registerHandlers() {
        if (!this.connection) return;

        // 1. CallInvitation
        this.connection.on('CallInvitation', (payload: CallInvitationEvent) => {
            console.log('[SignalR] Received CallInvitation:', payload);
            store.dispatch(setIncomingInvitation(payload));
        });

        // 2. CallAccepted
        this.connection.on('CallAccepted', (payload: { callId: string }) => {
            console.log('[SignalR] Received CallAccepted:', payload);
            // We might need to fetch full call details here or just proceed with connecting
            // Ideally we should have the full call object, but for now we set status
            store.dispatch(setCallStatus('connecting'));
        });

        // 3. CallRejected
        this.connection.on('CallRejected', (payload: { callId: string }) => {
            console.log('[SignalR] Received CallRejected:', payload);
            store.dispatch(endCall());
            // Optionally show a toast or notification
        });

        // 4. CallEnded
        this.connection.on('CallEnded', (payload: { callId: string; reason: string }) => {
            console.log('[SignalR] Received CallEnded:', payload);
            store.dispatch(endCall());
        });

        // 5. CallActive
        this.connection.on('CallActive', (payload: { callId: string }) => {
            console.log('[SignalR] Received CallActive:', payload);
            store.dispatch(setCallStatus('active'));
        });

        // 6. DurationWarning
        this.connection.on('DurationWarning', (payload: { remainingMinutes: number }) => {
            console.warn('[SignalR] DurationWarning:', payload);
            // Dispatch action to show warning UI (can be handled by checking duration or a specific flag)
        });

        // WebRTC Signaling Events
        // These will be consumed by the CallManager/WebRTC logic via RxJS or Callbacks
        // For simplicity, we can dispatch them to Redux or use a listener pattern.
        // Given React/Redux architecture, putting large strings (SDP) in Redux is okay but frequent ICE candidates might be noisy.
        // A better approach for WebRTC signaling is to expose an event emitter style interface or callbacks.

        // However, to keep it simple and centralized:
        // We will emit custom window events or use a singleton behavior subject.
        // Let's use custom events for WebRTC signals to avoid polluting Redux with high-frequency signaling data if possible,
        // OR we can just pass them to the callbacks registered by CallManager.
    }

    // --- External Event Subscription (for CallManager) ---

    public onReceiveOffer(callback: (sdp: string) => void) {
        this.connection?.on('ReceiveOffer', callback);
    }

    public onReceiveAnswer(callback: (sdp: string) => void) {
        this.connection?.on('ReceiveAnswer', callback);
    }

    public onReceiveIceCandidate(callback: (candidate: IceCandidatePayload) => void) {
        this.connection?.on('ReceiveIceCandidate', callback);
    }

    public offWebRTC() {
        this.connection?.off('ReceiveOffer');
        this.connection?.off('ReceiveAnswer');
        this.connection?.off('ReceiveIceCandidate');
    }
}

export const signalRService = new SignalRService();
