import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

export const SocketContext = createContext();

// connect to server using socket.io
const socket = io('http://localhost:5000');

export const ContextProvider = ({ children }) => {
	const [stream, setStream] = useState(null);
	const [me, setMe] = useState('');
	const [call, setCall] = useState({});
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);

	const myVideo = useRef();

	useEffect(() => {
		// First part is all when it comes to requesting permissions from the user
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
			myVideo.current.srcObject = currentStream;
			// with the useRef, not only set the currentSteam to the state, but also populate video iframe once includes it in the code.

			// Seconde part is to use socket.on to listen for specific action from the server
			socket.on('me', (id) => setMe(id));

			// Listen to the callUser action
			socket.on('callUser', ({ from, name: callerName, signal }) => {
				setCall({ isReceivedCall: true, from, name: callerName, signal });
			});
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);
		
		const peer = new Peer({ initiator: false, trickle: false, stream });
		// Peer is going to behave similarly to socket.io, it's going to have some actions and some handlers that are going to happen once call somebody or answer a call. So in this case, it has peer.on
		peer.on('signal', () => {
			socket.emit('answerCall', { signal: data, to: call.from });
		});
		peer.on('stream', (currentStream) => {
			
		})

	};

	const callUser = () => {};

	const leaveCall = () => {};
};
