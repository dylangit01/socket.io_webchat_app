import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './VideoPlayerStyles';

import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

	const classes = useStyles();
	return (
		<Grid container className={classes.gridContainer}>
			{/* Own video */}
			{stream && (
				<Paper className={classes.paper}>
					<Grid item xs={12} md={6}>
						<Typography variant='h5' gutterBottom>
							{name || 'Name'}
						</Typography>
						<video playsInline muted ref={myVideo} autoPlay className={classes.video}></video>
					</Grid>
				</Paper>
			)}

			{/* Other's video */}
			{callAccepted && !callEnded && (
				<Paper className={classes.paper}>
					<Grid item xs={12} md={6}>
						<Typography variant='h5' gutterBottom>
							{call.name || 'Name'}
						</Typography>
						<video playsInline ref={userVideo} autoPlay className={classes.video}></video>
					</Grid>
				</Paper>
			)}

		</Grid>
	);
};

export default VideoPlayer;
