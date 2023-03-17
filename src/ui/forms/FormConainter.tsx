import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default styled(Paper)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	overflowY: 'auto',
	paddingBottom: theme.spacing(2),
}));
