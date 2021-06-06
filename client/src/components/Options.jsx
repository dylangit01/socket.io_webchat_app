import React, { useContext, useState } from 'react';
import useStyles from './OptionsStyles';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
	const [idToCall, setIdToCall] = useState(SocketContext);

	const classes = useStyles();
	const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);

	return (
		<Container className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<form className={classes.root} noValidate autoComplete='off'>
					<Grid container className={classes.gridContainer}>
						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography variant='h6' gutterBottom>
								Account Info
							</Typography>
							<TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
							<CopyToClipboard text={me} className={classes.margin}>
								<Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
									Copy Your ID
								</Button>
							</CopyToClipboard>
						</Grid>

						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography variant='h6' gutterBottom>
								Make a Call
							</Typography>
							<TextField label='ID to Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />

							{callAccepted && !callEnded ? (
								<Button
									variant='contained'
									color='secondary'
									startIcon={<PhoneDisabled fontSize='large' />}
									fullWidth
									onClick={leaveCall}
									className={classes.margin}
								>
									Hang Up
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									startIcon={<Phone fontSize='large' />}
									fullWidth
									onClick={() => callUser(idToCall)}
									className={classes.margin}
								></Button>
							)}
						</Grid>
					</Grid>
				</form>
			</Paper>
			{children}
		</Container>
	);
};

export default Options;
