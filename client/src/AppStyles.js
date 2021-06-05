import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 100px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '600px',
		border: '2px solid black',

		[theme.breakpoints.down('xs')]: {
			width: '90%',
		},
	},
	image: {
		marginLeft: '15px',
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
}));
