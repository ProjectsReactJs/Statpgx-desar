import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#3E7A99',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
	},
});

export default createTheme(defaultTheme);
