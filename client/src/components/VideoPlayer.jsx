import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './VideoPlayerStyles';

import { SocketContext } from '../SocketContext'

const VideoPlayer = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.gridContainer}>
			{/* Own video */}
			<Paper className={classes.paper}>
				<Grid item xs={12} md={6}>
					<Typography variant='h5' gutterBottom>
						Name
					</Typography>
					<video playsInline muted ref={'myVideo'} autoplay className={classes.video}></video>
				</Grid>
			</Paper>

			{/* Other's video */}
			<Paper className={classes.paper}>
				<Grid item xs={12} md={6}>
					<Typography variant='h5' gutterBottom>
						Name
					</Typography>
					<video playsInline ref={'userVideo'} autoplay className={classes.video}></video>
				</Grid>
			</Paper>
		</Grid>
	);
}
 
export default VideoPlayer;