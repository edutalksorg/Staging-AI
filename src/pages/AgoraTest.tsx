import React, { useState, useEffect } from 'react';
import agoraService from '../services/agora';

/**
 * Standalone Agora Test Page
 * No backend required - pure Agora SDK testing
 */
const AgoraTest: React.FC = () => {
    const [channelName, setChannelName] = useState('test-channel-123');
    const [userName, setUserName] = useState(`User-${Math.floor(Math.random() * 1000)}`);
    const [isJoined, setIsJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState<string[]>([]);
    const [logs, setLogs] = useState<string[]>([]);


    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
        console.log(`[AgoraTest] ${message}`);
    };

    useEffect(() => {
        // Set up Agora event callbacks
        agoraService.setEventCallbacks({
            onUserPublished: (user) => {
                addLog(`✅ Remote user joined: ${user.uid}`);
                setRemoteUsers(prev => [...prev, String(user.uid)]);
            },
            onUserLeft: (user) => {
                addLog(`👋 Remote user left: ${user.uid}`);
                setRemoteUsers(prev => prev.filter(id => id !== String(user.uid)));
            },
            onConnectionStateChange: (state) => {
                addLog(`🔗 Connection state: ${state}`);
            }
        });

        return () => {
            // Cleanup on unmount
            agoraService.leaveChannel().catch(console.error);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleJoin = async () => {
        try {
            addLog(`🎙️ Joining channel: ${channelName} as ${userName}`);

            // Initialize Agora
            await agoraService.initialize();
            addLog('✅ Agora client initialized');

            // Join channel with null token (works without certificate)
            await agoraService.joinChannel(channelName, null, userName);
            addLog(`✅ Joined channel successfully!`);

            setIsJoined(true);
        } catch (error: any) {
            addLog(`❌ Error joining channel: ${error.message}`);
            console.error('Join error:', error);
        }
    };

    const handleLeave = async () => {
        try {
            addLog('👋 Leaving channel...');
            await agoraService.leaveChannel();
            addLog('✅ Left channel successfully');
            setIsJoined(false);
            setRemoteUsers([]);
        } catch (error: any) {
            addLog(`❌ Error leaving channel: ${error.message}`);
        }
    };

    const handleToggleMute = async () => {
        try {
            const newMuteState = await agoraService.toggleMute();
            setIsMuted(newMuteState);
            addLog(newMuteState ? '🔇 Microphone muted' : '🎤 Microphone unmuted');
        } catch (error: any) {
            addLog(`❌ Error toggling mute: ${error.message}`);
        }
    };

    return (
        <div style={{
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>🎙️ Agora Voice Call Test</h1>
            <p style={{ color: '#666' }}>
                Test Agora voice calls without backend. Open this page in two browser windows with different user names.
            </p>

            {/* Configuration */}
            <div style={{
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h3>Configuration</h3>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Channel Name:
                    </label>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        disabled={isJoined}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        placeholder="Enter channel name"
                    />
                    <small style={{ color: '#666' }}>
                        Both users must use the SAME channel name to connect
                    </small>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Your Name:
                    </label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={isJoined}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        placeholder="Enter your name"
                    />
                    <small style={{ color: '#666' }}>
                        Each user should have a DIFFERENT name
                    </small>
                </div>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
            }}>
                {!isJoined ? (
                    <button
                        onClick={handleJoin}
                        style={{
                            flex: 1,
                            padding: '15px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        🎙️ Join Channel
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleToggleMute}
                            style={{
                                flex: 1,
                                padding: '15px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                background: isMuted ? '#ff9800' : '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            {isMuted ? '🔇 Unmute' : '🎤 Mute'}
                        </button>
                        <button
                            onClick={handleLeave}
                            style={{
                                flex: 1,
                                padding: '15px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                background: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            👋 Leave Channel
                        </button>
                    </>
                )}
            </div>

            {/* Status */}
            <div style={{
                background: isJoined ? '#e8f5e9' : '#fff3e0',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: `2px solid ${isJoined ? '#4CAF50' : '#ff9800'}`
            }}>
                <h3 style={{ margin: '0 0 10px 0' }}>
                    Status: {isJoined ? '🟢 Connected' : '🟡 Not Connected'}
                </h3>
                <p style={{ margin: '5px 0' }}>
                    <strong>Channel:</strong> {channelName}
                </p>
                <p style={{ margin: '5px 0' }}>
                    <strong>Your Name:</strong> {userName}
                </p>
                <p style={{ margin: '5px 0' }}>
                    <strong>Microphone:</strong> {isMuted ? '🔇 Muted' : '🎤 Unmuted'}
                </p>
                <p style={{ margin: '5px 0' }}>
                    <strong>Remote Users:</strong> {remoteUsers.length > 0 ? remoteUsers.join(', ') : 'None'}
                </p>
            </div>

            {/* Instructions */}
            <div style={{
                background: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h3>📋 How to Test:</h3>
                <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <li>Open this page in <strong>two browser windows</strong> (or use incognito mode)</li>
                    <li>Use the <strong>same channel name</strong> in both windows</li>
                    <li>Use <strong>different user names</strong> in each window</li>
                    <li>Click "Join Channel" in both windows</li>
                    <li>You should hear each other speak!</li>
                    <li>Test mute/unmute functionality</li>
                </ol>
            </div>

            {/* Logs */}
            <div style={{
                background: '#263238',
                color: '#00ff00',
                padding: '15px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                maxHeight: '300px',
                overflowY: 'auto'
            }}>
                <h3 style={{ color: '#00ff00', margin: '0 0 10px 0' }}>📝 Logs:</h3>
                {logs.length === 0 ? (
                    <p style={{ color: '#666' }}>No logs yet...</p>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} style={{ marginBottom: '5px' }}>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AgoraTest;
