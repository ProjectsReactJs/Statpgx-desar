import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Formik, FormikProps, Form as FormikForm, Field, FormikHelpers } from 'formik';
import { Grid, MenuItem, Button, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FormContainer from '@ui/forms/FormConainter';
import FormHeader from '@ui/forms/FormHeader';
import FormTitle from '@ui/forms/FormTitle';
import FormInnerContainer from '@ui/forms/FormInnerContainer';
import useLocaleOptions from '@src/hooks/useLocaleOptions';
import { setLocaleCookie } from '@src/utils/translation';
import { defaultValues, SettingsFormValues } from './settingsHelper';
import LoadingIndicator from '@ui/loadingIndicator/LoadingIndicator';
import { MenuOptionProps } from '@ui/navigation/menu/Menu';
import { TextField } from '@ui/forms/controls/TextField';

type SettingsFormProps = {
	languageOptions: MenuOptionProps[];
};

const SettingsForm = (props: SettingsFormProps & FormikProps<SettingsFormValues>) => {
	const { handleSubmit, languageOptions } = props;
	const { t } = useTranslation();

	return (
		<FormContainer>
			<FormikForm onSubmit={handleSubmit} noValidate autoComplete="false">
				<FormHeader>
					<FormTitle variant="h6" color="inherit" noWrap>
						{t('settings.title')}
					</FormTitle>
					<Button
						type="submit"
						startIcon={<SaveIcon />}
						variant="contained"
						color="primary"
						sx={(theme) => ({ margin: theme.spacing(1) })}
					>
						{t('settings.form.actions.save')}
					</Button>
				</FormHeader>
				<Divider />
				<FormInnerContainer>
					<Grid container item direction="column" xs={12} md={6} spacing={1}>
						<Grid item>
							<Field
								fullWidth
								select
								id="language"
								name="language"
								label={t('settings.language.title')}
								component={TextField}
								required
							>
								{languageOptions.map((option, index) => (
									<MenuItem key={`language-${index}`} value={option.id}>
										{`${option.label}`}
									</MenuItem>
								))}
							</Field>
						</Grid>
					</Grid>
				</FormInnerContainer>
			</FormikForm>
		</FormContainer>
	);
};

export default function Settings() {
	const { t, i18n } = useTranslation();
	const { language } = i18n;
	const router = useRouter();
	const [languageOptions] = useLocaleOptions();
	const [initialValues, setInitialValues] = useState(defaultValues);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values: SettingsFormValues, actions: FormikHelpers<SettingsFormValues>) => {
		setIsLoading(true);
		setLocaleCookie(values.language);
		router.push(router.asPath, router.asPath, { locale: values.language });
		setIsLoading(false);
	};

	useEffect(() => {
		if (language) {
			setInitialValues({
				language,
			});
		}
	}, [language]);

	if (isLoading) {
		return <LoadingIndicator>{t('loading')}</LoadingIndicator>;
	}

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
				{(props) => <SettingsForm {...props} languageOptions={languageOptions} />}
			</Formik>
		</>
	);
}
