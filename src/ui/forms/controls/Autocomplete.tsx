import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import { useTranslation } from 'next-i18next';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import {
	CircularProgress,
	ListSubheader,
	Popper,
	Typography,
	TextField,
	TextFieldProps as MuiTextFieldProps,
	Autocomplete as MuiAutocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteProps as MuiAutocompleteProps,
	autocompleteClasses,
} from '@mui/material';

type AutocompleteProps = {
	textfieldProps: MuiTextFieldProps;
	onValueChanged: (option: any) => void;
};

export type EnhancedAutocompleteProps = MuiAutocompleteProps<any, boolean | undefined, boolean | undefined, boolean | undefined> &
	FieldProps &
	AutocompleteProps;

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props;
	const dataSet = data[index];
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
	};

	if (dataSet.hasOwnProperty('group')) {
		return (
			<ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		);
	}

	return (
		<Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
			{dataSet[1].label}
		</Typography>
	);
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext);
	return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null);
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(
	props,
	ref
) {
	const { children, ...other } = props;
	const itemData: React.ReactChild[] = [];
	(children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
		itemData.push(item);
		itemData.push(...(item.children || []));
	});

	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
		noSsr: true,
	});
	const itemCount = itemData.length;
	const itemSize = smUp ? 36 : 48;

	const getChildSize = (child: React.ReactChild) => {
		if (child.hasOwnProperty('group')) {
			return 48;
		}

		return itemSize;
	};

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize;
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	};

	const gridRef = useResetCache(itemCount);

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width="100%"
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType="ul"
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}
				>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	);
});

const StyledPopper = styled(Popper)({
	[`& .${autocompleteClasses.listbox}`]: {
		boxSizing: 'border-box',
		'& ul': {
			padding: 0,
			margin: 0,
		},
	},
});

export const Autocomplete: React.FC<EnhancedAutocompleteProps> = (props) => {
	const { t } = useTranslation();
	const { field, form, onValueChanged, loading, textfieldProps, ...other } = props;
	const { name } = field;
	const { touched, errors } = form;

	const fieldError = getIn(errors, name);
	const showError: boolean = getIn(touched, name) && !!fieldError;

	const fieldProps = { ...field };

	return (
		<MuiAutocomplete
			{...other}
			disableListWrap
			PopperComponent={StyledPopper}
			ListboxComponent={ListboxComponent}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					{...textfieldProps}
					onBlur={fieldProps.onBlur}
					error={showError}
					helperText={showError ? t(fieldError) : null}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
			renderOption={(props, option) => [props, option] as React.ReactNode}
			onChange={(
				_event: React.SyntheticEvent<Element, Event>,
				option: any,
				_reason: AutocompleteChangeReason,
				_details?: AutocompleteChangeDetails<any> | undefined
			) => {
				onValueChanged && onValueChanged(option);
			}}
		/>
	);
};

Autocomplete.displayName = 'FormikMaterialUIAutocomplete';
