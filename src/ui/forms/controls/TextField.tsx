import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { FieldProps, getIn } from 'formik';
import { useTranslation } from 'next-i18next';

export type EnhancedTextFieldProps = MuiTextFieldProps & FieldProps;

export const fieldToTextField = ({
	field,
	form,
	select,
	margin = 'normal',
	variant = 'outlined',
	InputLabelProps = {
		shrink: true,
	},
	onChange,
	SelectProps = {
		displayEmpty: true,
	},
	...props
}: EnhancedTextFieldProps) => {
	const { t } = useTranslation();
	const { name } = field;
	const { touched, errors } = form;

	const fieldError = getIn(errors, name);
	const showError = getIn(touched, name) && !!fieldError;

	const fieldProps = { ...field };

	return {
		...props,
		...fieldProps,
		...(select && { SelectProps }),
		...(onChange && {
			onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
				fieldProps.onChange(event);
				onChange(event);
			},
		}),
		error: showError,
		helperText: showError ? t(fieldError) : props.helperText,
		InputLabelProps,
		margin,
		select,
		variant,
	};
};

export const TextField: React.FC<EnhancedTextFieldProps> = ({ children, ...props }) => (
	<MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>
);

TextField.displayName = 'FormikMaterialUITextField';
