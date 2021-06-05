import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import useStyles from './AppStyles'

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';

const App = () => {
	const classes = useStyles;
	return (
		<div className={classes.wrapper}>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography variant='h2' align='center'>
					Socket Chat
				</Typography>
			</AppBar>
			<VideoPlayer />
			<Options>
				<Notifications />
			</Options>
		</div>
	);
};

export default App;
