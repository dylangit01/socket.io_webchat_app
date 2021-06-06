import React, { useContext } from 'react';
import useStyles from './OptionsStyles';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';

import {SocketContext } from '../SocketContext'

const Options = ({ children }) => {
	const classes = useStyles();

	

	return (
		<div>
			Options
			{children}
		</div>
	 );
}
 
export default Options;