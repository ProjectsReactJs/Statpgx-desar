import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default styled(Typography)(({ theme }) => ({
	flexGrow: 1,
	paddingLeft: theme.spacing(2),
	paddingTop: theme.spacing(2),
}));
