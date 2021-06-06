import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

export const SocketContext = createContext();

// connect to server using socket.io
const socket = io('http://localhost:5000');

export const ContextProvider = ({ children }) => {
	const [stream, setStream] = useState();
	const [me, setMe] = useState('');
	const [call, setCall] = useState({});
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState('');

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		// First part is about when it comes to request permissions from the user

		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
			myVideo.current.srcObject = currentStream;
			// with the useRef, not only set the currentSteam to the state, but also populate video iframe once includes it in the code.
		});

		// Seconde part is to use socket.on to listen for specific action from the server

		// Receive server 'connection' with 'me' action and id, and set id to state "me"
		socket.on('me', (id) => setMe(id));

		// Listen to the callUser's call action
		socket.on('callUser', ({ from, name: callerName, signal }) => {
			setCall({ isReceivedCall: true, from, name: callerName, signal });
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });
		// Peer is going to behave similarly to socket.io, it's going to have some actions and some handlers that are going to happen once call somebody or answer a call. So in this case, it has peer.on
		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: call.from });
		});
		peer.on('stream', (currentStream) => {
			// setup another useRef for other user's video, it's the stream for other person
			userVideo.current.srcObject = currentStream;
		});

		// call.signal is from useEffect: setCall
		peer.signal(call.signal);

		// Below means the current connection is equal to the current peer who is inside of this connection
		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		peer.on('signal', (data) => {
			socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
		});
		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on('callAccepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});
		connectionRef.current = peer;
	};

	const leaveCall = () => {
		// Ended the call
		setCallEnded(true);

		// Destroy the ref to top receiving input from the user's camera and audio
		connectionRef.current.destroy();

		// Reload the page and provides a user with a new id and give this new id to useEffect "me" action
		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
