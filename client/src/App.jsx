import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';

const useStyles = makeStyles(theme => ({		// remember to wrap the object with parentheses to return it

}))

const App = () => {
	return (
		<div>
			<AppBar position='static' color='inherit'>
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
