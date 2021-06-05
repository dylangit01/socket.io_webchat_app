import React from 'react';
import useStyles from './OptionsStyles';

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