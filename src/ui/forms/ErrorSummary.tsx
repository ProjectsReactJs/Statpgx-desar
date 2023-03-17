import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles';
import { FormikErrors } from 'formik';

const ErrorSummaryContainer = styled('div')(({ theme }) => ({
	padding: theme.spacing(1),
	margin: theme.spacing(1),
	borderRadius: 4,
	backgroundColor: 'rgba(255, 23, 68, 0.07)',
	color: `${theme.palette.error.main}`,
	fontSize: '0.775rem',
}));

const Icon = styled(ErrorIcon)(({ theme }) => ({
	width: 20,
	height: 20,
	marginRight: theme.spacing(1),
}));

const ErrorMessage = styled('div')(() => ({
	display: 'flex',
}));

export type ErrorSummaryProps = {
	errors: FormikErrors<any>;
	title: string;
};

const ErrorSummary: React.FC<ErrorSummaryProps> = (props) => {
	const { errors, title } = props;
	return (
		<ErrorSummaryContainer>
			<ErrorMessage>
				<Icon />
				<div>{title}</div>
			</ErrorMessage>
			<ul>
				{Object.keys(errors).map((key) => (
					<li key={key}>{errors[key]}</li>
				))}
			</ul>
		</ErrorSummaryContainer>
	);
};

export default ErrorSummary;
