import { FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FieldProps } from 'formik';

type CheckboxProps = {
	label?: string;
};

export type EnhancedCheckboxProps = MuiCheckboxProps & FieldProps & CheckboxProps;

export const fieldToCheckbox = ({ color = 'primary', field, ...props }: EnhancedCheckboxProps) => {
	return {
		...props,
		...field,
		color,
	};
};

export const Checkbox: React.FC<EnhancedCheckboxProps> = ({ children, ...props }) => {
	return props.label ? (
		<FormControlLabel
			control={<MuiCheckbox {...fieldToCheckbox(props)} icon={<CheckBoxOutlineBlankIcon fontSize="small" />} />}
			label={props.label}
		/>
	) : (
		<MuiCheckbox {...fieldToCheckbox(props)} />
	);
};

Checkbox.displayName = 'FormikMaterialUICheckbox';
