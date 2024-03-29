## STATPGX

### UI "Create current and prospective medication page"

#### Activity
As a STATPGX user, I want to be able to open a page that displays the current and prospective medications fields.

Description
Create Current and Prospective Medications page that should contain the following fields:

Name of the Medication (Dropdown)

Conditions you are treating (Dropdown)

Relevant Diagnosis (Dropdown)

Add Medication (Button)

Submit (Button)

Acceptance Criteria
The page should display all the corresponding fields as in the mockup.

![](https://i.imgur.com/xtn1GxT.png)

## Technology Used
* [ReactJS]
* [Material UI]
* [NextJS]

## Installation
```
git clone https://github.com/ProjectsReactJs/Statpgx-sprint1.git
cd folder name
npm install
cp .env-example .env
```
Setting environment variables in the file .env
```
npm run start
```
## Installation de Material UI

Install Material UI, the world's most popular React UI framework.
```
npm install @mui/material @emotion/react @emotion/styled
```

## Content
* [assets](#item1)
* [Components](#item2)
	* [button](#item3)
		 * [Button.js](#item3)
	* [dashboard](#item4)
		* [Dashboard.tsx](#item4)
	* [dialogs](#item5)
		* [ConfirmationDialog.tsx](#item5)
	* [form](#item6)
		* [Select.js](#item6)
	* [header](#item7)
		* [NavBar.js](#item7)
	* [main](#item8)
		* [hooks](#item8)
	* [medications](#item9)
		* [main-section](#item10)
		* [output-section](#item11)
		* [patient-info-section](#item12)
		* [welcome-section](#item13)
	        * [Medications.tsx](#item14)
		* [MedicationsForm.tsx](#item15)
		* [MedicationsHelper.ts](#item16)
	* [settings](#item17)
		* [OptionSelect.js](#item17)
* [hooks](#item18)
* [OptionSelect.js](#item19)
* [pages](#item20)
    * [Medication.js](#item20)

<a name="item1"></a>
## assets
Está carpeta es la encargada de guardar las imagenes que se van a utilizar en la APP.

<a name="item2"></a>
## Components
Los componentes le permiten separar la interfaz de usuario en piezas independientes y reutilizables y pensar en cada pieza de forma aislada. Esta página proporciona una introducción a la idea de los componentes. Puede encontrar una API detallada sobre los componentes aquí.

<a name="item3"></a>
## button / Button.js
Esta carpeta contiene el componente botón donde recibe el color y el texto por parámetro. Se utilizó material de interfaz de usuario. 

#### Code:
```
import * as React from 'react';
import MUIButton from '@mui/material/Button';

const Button = ({ color, children }) => {
    return (
        <MUIButton variant="contained" disableElevation color={color} >
            {children}
        </MUIButton>
    );
}
export default Button;
```

<a name="item4"></a>
## Dashboard / Dashboard.tsx
Esta carpeta contiene un archivo llamado dashboard.tsx, es un componente de dialogo.

#### Code:
```
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function OptionSelect() {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            title: '',
            year: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            title: dialogValue.title,
            year: parseInt(dialogValue.year, 10),
        });
        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue,
                                year: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            title: newValue.inputValue,
                            year: '',
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={top100Films}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                sx={{ width: 520 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="--Please select option--" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new film</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.title}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    title: event.target.value,
                                })
                            }
                            label="title"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.year}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    year: event.target.value,
                                })
                            }
                            label="year"
                            type="number"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
```
#### Imagen de ejecución
![](https://i.imgur.com/4o4Jvcp.png)

<a name="item6"></a>
## form / Select.js
Está carpeta contiene un archivo llamado Select.js donde es el encargado del diseño de un formulario de Material UI.

#### Code
```
import { FormControl, InputLabel, Select as MUISelect, MenuItem } from "@mui/material";
import { v4 as uudi } from "uuid";

const Select = ({
    label = '--Please select an option--',
    id = uudi(),
    name = '',
    value = '',
    onChange,
    items = [],
    disabled = false,
    keyExtractor = (item) => item.id,
    textExtractor = (item) => item.name,
}) => {
    const handleChange = (e) => {
        onChange?.(e);
    }

    return (
        <FormControl fullWidth>
            {label && <InputLabel id={id}>{label}</InputLabel>}
            <MUISelect
                labelId={id}
                id={id}
                value={value}
                name={name}
                label={label}
                disabled={disabled}
                onChange={handleChange}
            >
                {items.map(item => (
                    <MenuItem value={keyExtractor(item)} key={keyExtractor(item)}>{textExtractor(item)}</MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    );
}

export default Select;
```
<a name="item7"></a>
## header / NavBar.js
En esta carpeta de header contiene un archivo llamado NavBar.js donde contiene todo el diseño de la barra de navegación de la APP.

#### Code
```
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../images/statpgx.png';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        <img src={logo} alt="statpgx" />
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
```
#### Imagen de ejecución
![](https://i.imgur.com/1nDjsfU.png)

<a name="item8"></a>
## main / hooks
Esta carpeta main contiene los archivos AuthenticatedPage.tsx , MainContent.tsx , NavigationItemLink.tsx , NavigationItemWithSubItemsLink.tsx , NavigationList.tsx , Page.tsx  y una carpeta llamada hooks que contiene useNavigationOptions.tsx 

<a name="item8"></a>
#### useNavigationOptions.tsx
Este archivo es el encargado de mostrar los imagenes del menu lateral de la APP. 

#### Code
```
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MedicationIcon from '@mui/icons-material/Medication';
import { getTranslatedOptions } from '@utils/translation';

export type NavigationItemProps = {
	icon?: React.ReactElement;
	to: string;
	text: string;
	key: string;
	paths: string[];
	subItems?: NavigationItemProps[];
};

export type NavigationOptions = {
	subheader?: string;
	items: NavigationItemProps[];
};

function useNavigationOptions(): [NavigationOptions[], NavigationItemProps | undefined] {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const { language } = i18n;
	const { pathname } = router;
	const [navigationOptions, setNavigationOptions] = useState<NavigationOptions[]>([
		{
			items: [
				{
					icon: <DashboardRoundedIcon />,
					text: 'sidebar.navigationItems.dashboard',
					to: '/',
					paths: ['/'],
					key: 'sidebar.navigationItems.dashboard',
				},
				{
					icon: <MedicationIcon />,
					text: 'sidebar.navigationItems.medication',
					to: '/medications',
					paths: ['/medications'],
					key: 'sidebar.navigationItems.medication',
				},
				{
					icon: <SettingsRoundedIcon />,
					text: 'sidebar.navigationItems.settings',
					to: '/settings',
					paths: ['/settings'],
					key: 'sidebar.navigationItems.settings',
				},
			],
		},
	]);
	const [translatedOptions, setTranslatedOptions] = useState(navigationOptions);
	const [selectedOption, setSelectedOption] = useState<NavigationItemProps>();

	useEffect(() => {
		const translated: NavigationOptions[] = navigationOptions.map((nO) => {
			const { items, subheader } = nO;
			const translatedItems = getTranslatedOptions<NavigationItemProps>(t, items, 'text');

			return {
				...(subheader && { subheader: t(subheader) }),
				items: translatedItems.map(({ subItems, ...otherProps }) => {
					return {
						...otherProps,
						...(subItems && { subItems: getTranslatedOptions<NavigationItemProps>(t, subItems, 'text') }),
					};
				}),
			};
		});
		setTranslatedOptions(translated);
	}, [navigationOptions, language]);

	useEffect(() => {
		const items = translatedOptions
			.flatMap((tO) => tO.items)
			.reduce((translatedItems: NavigationItemProps[], currentItem) => {
				return currentItem.subItems?.length ? translatedItems.concat(currentItem.subItems) : translatedItems.concat(currentItem);
			}, []);

		const sO = items.find((option) => option.paths.includes(pathname)) || items[0];

		setSelectedOption(sO);
	}, [translatedOptions, pathname]);

	return [translatedOptions, selectedOption];
}

export default useNavigationOptions;

```
![](https://i.imgur.com/qG4s3cg.png)

<a name="item8"></a>
#### AuthenticatedPage.tsx
Este archivo es el encargado de la autenticación de page de la app.

#### Code
```
mport React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import LoadingIndicator from '@ui/loadingIndicator/LoadingIndicator';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export type AuthProps = {
	roles: string[];
	permissions: string[];
};

export type AuthenticatedPageProps = {
	auth: AuthProps;
};

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children, auth }) => {
	const { t } = useTranslation();
	const { status, data } = useSession({ required: true });
	const router = useRouter();

	useEffect(() => {
		const logout = async (error: unknown) => {
			const signOutResponse = await signOut({ redirect: false, callbackUrl: `/auth/signin?error=${error}` });
			router.push(signOutResponse.url);
		};

		if (data) {
			const { error } = data;
			if (error) {
				logout(error);
			}
		}
	}, [data]);

	if (status === 'loading') {
		return <LoadingIndicator>{t('loading')}</LoadingIndicator>;
	}

	const { user } = data || {};
	const { roles: userRoles = [], permissions: userPermissions = [] } = user || {};

	const { permissions = [], roles = [] } = auth;

	const hasValidRoles = roles.length ? userRoles.findIndex((userRole) => roles.includes(userRole.value)) !== -1 : true;
	const hasValidPermission = permissions.length
		? userPermissions.findIndex((permission) => permissions.includes(permission)) !== -1
		: true;

	if (hasValidRoles && hasValidPermission) return children as React.ReactElement;

	return (
		<div>
			<h1>You are not authorized to view this page!</h1>
		</div>
	);
};

export default AuthenticatedPage;

```

<a name="item8"></a>
#### MainContent.tsx
Este archivo es el encargado de la estructura del main del contenido centro de la app.

#### Code
```
import React from 'react';
import MuiContainer from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const Content = styled('main')(() => ({
	flexGrow: 1,
	height: '100vh',
	overflow: 'auto',
	backgroundColor: '#f3f3f3',
}));

const Container = styled(MuiContainer)(({ theme }) => ({
	paddingTop: theme.spacing(4),
	paddingBottom: theme.spacing(4),
	display: 'flex',
	flexDirection: 'column',
}));

export type MainContentProps = {};

const MainContent: React.FC<MainContentProps> = (props) => {
	const { children } = props;

	return (
		<Content>
			<Container maxWidth={false} sx={{ mt: { xs: '64px' }, height: { xs: `calc(100% - 64px)` } }}>
				{children}
			</Container>
		</Content>
	);
};

export default MainContent;

```

<a name="item8"></a>
#### NavigationItemLink.tsx
Este componente es el encargado de un item de la barra de navegation. 

#### Code
```
import React from 'react';
import Link from 'next/link';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';

export type NavigationItemLinkProps = {
	item: NavigationItemProps;
	onSelectNavigationItem: (option: NavigationItemProps) => void;
	selectedNavigationItem?: NavigationItemProps;
};

const NavigationItemLink: React.FC<NavigationItemLinkProps> = (props) => {
	const { onSelectNavigationItem, item, selectedNavigationItem } = props;
	const { icon, text, to, key } = item;
	const isSelected = selectedNavigationItem ? key === selectedNavigationItem.key : false;
	return (
		<Link href={to} passHref>
			<ListItemButton
				component="a"
				onClick={() => {
					onSelectNavigationItem(item);
				}}
				title={text}
				selected={isSelected}
			>
				{icon ? <ListItemIcon sx={{ minWidth: { xs: 40, sm: 52 } }}>{icon}</ListItemIcon> : null}
				<ListItemText
					primaryTypographyProps={{
						

```

<a name="item8"></a>
#### NavigationItemWithSubItems.tsx
Este componente es el encargado de unir todos los item del navegación donde es el diseño y validacion de cada items de la App.

#### Code
```
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import {
	List,
	ListItemButton as MuiListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
	Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';

export type NavigationItemWithSubItemsLinkProps = {
	item: NavigationItemProps;
	onSelectNavigationItem: (option: NavigationItemProps) => void;
	selectedNavigationItem?: NavigationItemProps;
};

const ParentListItemButton = styled(MuiListItemButton, { shouldForwardProp: (prop) => prop !== 'selected' })<ListItemButtonProps>(
	({ theme, selected }) => ({
		...(selected && {
			backgroundColor: alpha(theme.palette.primary.main, 0.2),
		}),
	})
) as typeof MuiListItemButton;

const NavigationItemWithSubItemsLink: React.FC<NavigationItemWithSubItemsLinkProps> = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isChildSelected, setChildSelected] = useState(false);
	const { onSelectNavigationItem, item, selectedNavigationItem } = props;
	const { icon, text, subItems = [] } = item;

	const handleListItemClick = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const selectedSubItem = subItems?.find((subItem) => subItem.key === selectedNavigationItem?.key);
		setIsOpen(!!selectedSubItem);
		setChildSelected(!!selectedSubItem);
	}, [selectedNavigationItem]);

	return (
		<div>
			<ParentListItemButton onClick={handleListItemClick} title={text} selected={isChildSelected}>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText
					primaryTypographyProps={{
						variant: 'body2',
					}}
				>
					{text}
				</ListItemText>
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</ParentListItemButton>
			<Collapse in={isOpen} timeout={200}>
				<List component="div" disablePadding>
					{subItems.map((subItem, subItemIndex) => {
						const { icon: subItemIcon, text: subItemText, to: subItemTo, key: subItemKey } = subItem;
						const isSelected = selectedNavigationItem ? subItemKey === selectedNavigationItem.key : false;
						return (
							<Link href={subItemTo} passHref key={`navItem-subItem-${subItemIndex}`}>
								<MuiListItemButton
									component="a"
									onClick={() => {
										onSelectNavigationItem(subItem);
									}}
									title={subItemText}
									selected={isSelected}
								>
									<ListItemIcon>{subItemIcon}</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											variant: 'body2',
										}}
									>
										{subItemText}
									</ListItemText>
								</MuiListItemButton>
							</Link>
						);
					})}
				</List>
			</Collapse>
		</div>
	);
};

export default NavigationItemWithSubItemsLink;

```

<a name="item8"></a>
#### NavigationList.tsx
Este componente es parte también del navigation de la app.

#### Code
```
import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { List, Divider, ListSubheader } from '@mui/material';
import useNavigationOptions, { NavigationItemProps } from '@components/main/hooks/useNavigationOptions';
import NavigationItemLink from './NavigationItemLink';
import NavigationItemWithSubItemsLink from './NavigationItemWithSubItemsLink';

export type NavigastionListProps = {};

const NavigationList: React.FC<NavigastionListProps> = () => {
	const [navigationItems, selectedNavigationItem] = useNavigationOptions();
	const router = useRouter();

	const onSelectNavigationItem = async (option: NavigationItemProps) => {
		if (selectedNavigationItem && option.key !== selectedNavigationItem.key) {
			const { key } = option;
			switch (key) {
				case 'sidebar.navigationItems.logout': {
					const response = await signOut({ redirect: false, callbackUrl: '/auth/signin' });
					router.push(response.url);
					break;
				}
				default: {
					if (option.to) {
						router.push(option.to);
					}
					break;
				}
			}
		}
	};

	return (
		<div>
			{navigationItems.map((navItem, navIndex) => {
				const { subheader, items } = navItem;

				return (
					<List key={`navItem-${navIndex}`} component="nav">
						{navIndex !== 0 && <Divider />}
						{subheader && <ListSubheader inset>{subheader}</ListSubheader>}
						{items.map((item, itemIndex) => {
							if (item.subItems && item.subItems.length) {
								return (
									<NavigationItemWithSubItemsLink
										item={item}
										selectedNavigationItem={selectedNavigationItem}
										onSelectNavigationItem={onSelectNavigationItem}
										key={`navItem-${navIndex}-${itemIndex}`}
									/>
								);
							} else {
								return (
									<NavigationItemLink
										item={item}
										selectedNavigationItem={selectedNavigationItem}
										onSelectNavigationItem={onSelectNavigationItem}
										key={`navItem-${navIndex}-${itemIndex}`}
									/>
								);
							}
						})}
					</List>
				);
			})}
		</div>
	);
};

export default NavigationList;

```
 
<a name="item8"></a>
#### Page.tsx
Este archivo es el encargado de armar en archivo que se muestra principal en la App, donde se hace la llamada a los demas componentes creado.

#### Code
```
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Sidebar from '@ui/navigation/sidebar/Sidebar';
import Header from '@ui/header/Header';
import MainContent from './MainContent';
import NavigationList from './NavigationList';
import logo from '../../assets/images/statpgx-logo.png';

const Root = styled('div')(() => ({
	display: 'flex',
	'.analyticsReport': {
		flexGrow: 1,
	},
}));

const Footer = styled('footer')(({ theme }) => ({
	position: 'relative',
	marginTop: 15,
	bottom: 0,
	borderTop: '1px solid #e7e7e7',
	fontWeight: 300,
	lineHeight: '1.5em',
}));

const FooterText = styled('p')(() => ({
	float: 'right',
	margin: 0,
	padding: '15px',
	fontSize: '14px',
}));


export type PageProps = {};

const Page: React.FC<PageProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('md'));
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		setIsSidebarOpen(isSm);
	}, [isSm]);

	const onToggleSidebar = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<SnackbarProvider
			maxSnack={1}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'top',
			}}
		>
			<Root>
				<Header isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar}>
					<Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
						<Image src={logo} alt="statpgx" height={60} width={200} />
					</Box>
				</Header>
				<Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar}>
					<NavigationList />
				</Sidebar>
				<MainContent>
					<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
					<Footer>
						<FooterText>
							&copy; {new Date().getFullYear()} {t('footer.copyright')}
						</FooterText>
					</Footer>
				</MainContent>
			</Root>
		</SnackbarProvider>
	);
};

export default Page;
```

![](https://i.imgur.com/YvmeFHe.png)


<a name="item9"></a>
## Medication / main-section / output-section / patient-info-section / welcome-section 
Esta carpeta de medication contiene y sub carpeta que son main-section, output-section, patient-info-section, welcome-section y 3 archivos llamados Medications.tsx, MedicationsForm.tsx y medicationsHelper.ts

<a name="item10"></a>
## main-section
Esta carpeta de medication contiene y sub carpeta que son main-section, output-section, patient-info-section, welcome-section y 3 archivos llamados Medications.tsx, MedicationsForm.tsx y medicationsHelper.ts

#### MedicationsMainSection.tsx
En este archivo es el encargado de las llamadas del archivo MedicationsMainSectionForm y validaciones con YUP  y declaraciones de tipos de datos y funcionamiento de los onclick de los button.

#### Code
```
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { Medication } from 'types/interfaces';
import { MedicationsFormValues } from "../medicationsHelper";
import { Formik } from 'formik';
import MedicationsMainSectionForm from './MedicationsMainSectionForm';

const mainSectionSchema = Yup.object().shape({
    medications: Yup.array().of(Yup.object().shape({
        medicationId: Yup.number().min(1).required(),
        conditionTreatmentId: Yup.number().min(1).required(),
        diagnosisId: Yup.number().min(1).required(),
    }))
});

type MedicationsMainSectionProps = {
    data: MedicationsFormValues;
    onNext: (data: MedicationsFormValues) => void;
    medications: Medication[];
    onShowPreview: () => void;
    onPrev: (data: MedicationsFormValues) => void;

}

const MedicationsMainSection = (props: MedicationsMainSectionProps) => {
    const { data, onNext, medications, onShowPreview, onPrev } = props;

    const { t } = useTranslation();

    const onSubmit = async (values: MedicationsFormValues) => {
        onNext(values);
    };

    return (
        <Formik
            initialValues={data}
            onSubmit={onSubmit}
            validationSchema={mainSectionSchema}
            enableReinitialize
        >
            {(props) => (
                <MedicationsMainSectionForm {...props} onShowPreview={onShowPreview} medications={medications} onPrev={onPrev} />
            )}
        </Formik >
    )
}

export default MedicationsMainSection;
```

## MedicationsMainSectionForm.tsx
Este archivo es el encargado del formulario de agregar medicamentos, condición relevante y diagnostico de la App.

#### Code
```
import { useTranslation } from "next-i18next";
import { Button, Grid, MenuItem } from '@mui/material';
import { Field, FieldArray, Form as FormikForm, FormikProps } from "formik";
import QueueIcon from '@mui/icons-material/Queue';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useConditionTreatments from "@src/hooks/useConditionTreatments";
import { TextField } from "@src/ui/forms/controls/TextField";
import useRelevantDiagnosis from "@src/hooks/useRelevantDiagnosis";
import { ConditionTreatment, Medication, RelevantDiagnosis } from "types/interfaces";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import theme from "@src/theme";
import FormFooter from "@src/ui/forms/FormFooter";
import { ChangeEvent } from "react";
import { MedicationsFormValues } from "../medicationsHelper";

const MAX_NUMBER_OF_MEDICATIONS = 8;

type ConditionsTreatmentsSelectProps = {
    id: string;
    name: string;
    medicationId: number;
    onChange: (conditionTreatment?: ConditionTreatment) => void,
}

const ConditionsTreatmentsSelect = (props: ConditionsTreatmentsSelectProps) => {
    const { id, name, medicationId, onChange } = props;

    const { t } = useTranslation();

    const { conditionTreatments = [] } = useConditionTreatments({
        queryParams: {
            medicationId,
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(conditionTreatments.find(conditionTreatment => conditionTreatment.id === Number(e.target.value)));
    }


    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.conditionTreatment')}
            component={TextField}
            required
            disabled={!medicationId}
            onChange={handleChange}
        >
            {conditionTreatments.map((option) => (
                <MenuItem key={option.id} value={option.id} >
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type RelevantDiagnosisSelectProps = {
    id: string;
    name: string;
    medicationId: number;
    conditionTreatmentId: number;
    onChange: (relevantDiagnosis?: RelevantDiagnosis) => void,
}

const RelevantDiagnosisSelect = (props: RelevantDiagnosisSelectProps) => {
    const { id, name, medicationId, conditionTreatmentId, onChange } = props;

    const { t } = useTranslation();

    const { relevantDiagnosis = [] } = useRelevantDiagnosis({
        queryParams: {
            medicationId,
            conditionTreatmentId,
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(relevantDiagnosis.find(relevantDiagnosis => relevantDiagnosis.id === Number(e.target.value)));
    }

    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.diagnosis')}
            component={TextField}
            required
            disabled={!medicationId || !conditionTreatmentId}
            onChange={handleChange}
        >
            {relevantDiagnosis.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type MedicationsMainSectionFormProps = FormikProps<MedicationsFormValues> & {
    medications: Medication[];
    onShowPreview: () => void;
    onPrev: (data: MedicationsFormValues) => void;
};

const MedicationsMainSectionForm = (props: MedicationsMainSectionFormProps) => {
    const { medications, values, onShowPreview, onPrev } = props;

    const { t } = useTranslation();

    return (
        <FormikForm noValidate autoComplete="false">
            <FormHeader>
                <FormTitle variant="h6" color="inherit" noWrap>
                    {t('medication.title')}
                </FormTitle>
            </FormHeader>

            <FieldArray name='medications'>
                {({ push, remove }) => (
                    <>
                        {values.medications.map((_, index) => <FormConainter key={index} style={{ marginBottom: theme.spacing(3) }}>
                            <FormInnerContainer>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        {t('medication.name')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Field
                                            fullWidth
                                            select
                                            id={`medications-${index}-medicationId`}
                                            name={`medications.${index}.medicationId`}
                                            label={t('medication.form.fields.medicationName')}
                                            component={TextField}
                                            required
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setFieldValue(
                                                `medicationsFullInfo.${index}.medication`,
                                                medications.find(medication => medication.id === Number(e.target.value))
                                            )}
                                        >
                                            {medications.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {`${option.label}`}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.condition')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ConditionsTreatmentsSelect
                                            id={`medications-${index}-conditionTreatmentId`}
                                            name={`medications.${index}.conditionTreatmentId`}
                                            medicationId={values.medications[index].medicationId}
                                            onChange={(cT) => props.setFieldValue(`medicationsFullInfo.${index}.conditionTreatment`, cT)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.diagnosis')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <RelevantDiagnosisSelect
                                            id={`medications-${index}-diagnosisId`}
                                            name={`medications.${index}.diagnosisId`}
                                            medicationId={values.medications[index].medicationId}
                                            conditionTreatmentId={values.medications[index].conditionTreatmentId}
                                            onChange={(rD) => props.setFieldValue(`medicationsFullInfo.${index}.diagnosis`, rD)}
                                        />
                                    </Grid>
                                </Grid>
                            </FormInnerContainer>

                            <FormFooter>
                                <Button
                                    startIcon={<DeleteForeverIcon />}
                                    variant="contained"
                                    color='error'
                                    sx={(theme) => ({ margin: theme.spacing(1) })}
                                    onClick={() => remove(index)}
                                >
                                    {t('medication.form.actions.remove')}
                                </Button>

                            </FormFooter>
                        </FormConainter>)}

                        {values.medications.length < MAX_NUMBER_OF_MEDICATIONS && <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={() => push({
                                medicationId: 0,
                                conditionTreatmentId: 0,
                                diagnosisId: 0,
                            })}
                        >
                            {t('medication.form.actions.add')}
                        </Button>
                        }
                        <Button
                            startIcon={<PreviewIcon />}
                            variant="outlined"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={onShowPreview}
                        >
                            {t('medication.form.actions.showPreview')}
                        </Button>
                        <Button
                            startIcon={<KeyboardBackspaceIcon />}
                            variant="contained"
                            color='secondary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={() => onPrev(values)}
                        >
                            {t('medication.goback')}
                        </Button>
                        <Button
                            type="submit"
                            startIcon={<EastIcon />}
                            variant="contained"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('medication.next')}
                        </Button>
                    </>
                )}
            </FieldArray>
        </FormikForm>
    );
}

export default MedicationsMainSectionForm;
```

## MedicationsPreviewDataDialog.tsx
En este archivo hacemos el diseño completo de un cuadro de dialogo donde se muestra la salida de las props en un formato JSON.

#### Code
```
import { useTranslation } from "next-i18next";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MedicationsFormValues } from "../medicationsHelper";

type MedicationsPreviewDataDialogProps = {
    showPreview: boolean;
    onHidePreview: () => void;
    values: MedicationsFormValues
}

const MedicationsPreviewDataDialog = (props: MedicationsPreviewDataDialogProps) => {
    const { t } = useTranslation();

    const { showPreview, onHidePreview, values } = props;

    return (
        <Dialog
            open={showPreview}
            onClose={onHidePreview}
            aria-labelledby="medication-preview-title"
            aria-describedby="medication-dialog-description"
            fullWidth
            maxWidth={'md'}
        >
            <DialogTitle id="medication-preview-title">
                {t('medication.previewModal.title')}
            </DialogTitle>
            <DialogContent>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </DialogContent>
            <DialogActions>
                <Button onClick={onHidePreview}>
                    {t('medication.form.actions.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MedicationsPreviewDataDialog;
```
#### Imagen de ejecución
![](https://i.imgur.com/MGBGd6g.png)

<a name="item11"></a>
## output-section
Esta carpeta de medication contiene y sub carpeta que son main-section, output-section, patient-info-section, welcome-section y 3 archivos llamados Medications.tsx, MedicationsForm.tsx y medicationsHelper.ts

#### MedicationsOutputSection.tsx
En este archivo es el encargado de mostrar la información de los medicamentos creados y al seleccionar un medicamento me muestra la información relevante de la condición y Diagnostico. También mostraremos información adicional del medicamento llamando el componente MedicationsSummaryAccordion.

#### Code
```
import { Formik } from "formik";
import { useTranslation } from "next-i18next";
import { Form as FormikForm, Field } from "formik";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import MedicationsSummaryAccordion from "./MedicationsSummaryAccordion";
import { Box, Button, MenuItem } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TextField } from "@src/ui/forms/controls/TextField";
import { MedicationsFormValues } from "../medicationsHelper";

type MedicationsOutputSectionProps = {
    data: MedicationsFormValues;
    onPrev: (data: MedicationsFormValues) => void;
    onNext: (data: MedicationsFormValues) => void;
}

const MedicationsOutputSection = (props: MedicationsOutputSectionProps) => {
    const { data, onPrev, onNext } = props;

    const { t } = useTranslation();

    return <Formik
        initialValues={data}
        onSubmit={onNext}
    >
        {({ values }) => (
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('medication.info')}
                    </FormTitle>
                </FormHeader>

                <FormConainter>
                    <FormInnerContainer>
                        <Field
                            fullWidth
                            select
                            id={`currentMedicationIndex`}
                            name={`currentMedicationIndex`}
                            label={t('medication.form.fields.medicationName')}
                            component={TextField}
                            required
                        >
                            {values.medicationsFullInfo.map((medicationInfo, index) => (
                                <MenuItem key={index} value={index}>
                                    {`${medicationInfo.medication.label}`}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormInnerContainer>
                </FormConainter>
                <FormConainter>
                    <FormInnerContainer >
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.name')}:</span> {(values.medicationsFullInfo[values.currentMedicationIndex].medication.label)}
                        </Box>
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.condition')}:</span> {`${(values.medicationsFullInfo[values.currentMedicationIndex].conditionTreatment.name)} - ${(values.medicationsFullInfo[values.currentMedicationIndex].conditionTreatment.description)}`}
                        </Box>
                        <Box style={{ fontSize: '18px' }}>
                            <span style={{ fontWeight: 'bold' }}>{t('medication.diagnosis')}:</span> {`${(values.medicationsFullInfo[values.currentMedicationIndex].diagnosis.code)} - ${(values.medicationsFullInfo[values.currentMedicationIndex].diagnosis.description)}`}
                        </Box>
                    </FormInnerContainer>
                    <MedicationsSummaryAccordion id={values.medications[values.currentMedicationIndex].medicationId} />

                </FormConainter>

                <Button
                    startIcon={<KeyboardBackspaceIcon />}
                    variant="contained"
                    color='secondary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                    onClick={() => onPrev(values)}
                >
                    {t('medication.goback')}
                </Button>
                <Button
                    startIcon={<EastIcon />}
                    type="submit"
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.next')}
                </Button>
            </FormikForm>
        )}
    </Formik >
}

export default MedicationsOutputSection;
```
#### Imagen de ejecución
![](https://i.imgur.com/uVEYVAj.png)

#### MedicationsSummaryAccordion.tsx
En este archivo se muestra la información necesaria del medicamento seleccionado de forma de accordion, utilizando material UI. 

#### Code
```
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMedicationFind from '@src/hooks/useMedicationFind';

type MedicationsSummaryAccordionProps = {
    id: number;
}

export default function MedicationsSummaryAccordion(props: MedicationsSummaryAccordionProps) {
    const { t } = useTranslation();
    const { id } = props;
    const { medication } = useMedicationFind(id)

    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange = (isExpanded: boolean, panel: string) => {
        setExpanded(isExpanded ? panel : false)
    }

    if (!medication || !medication.medicationSummary) {
        return null;
    }

    return (
        <div>
            {medication.medicationSummary.map((summary, index) => (
                <Accordion
                    key={summary.summaryKey}
                    expanded={expanded === `panel${index}`}
                    onChange={(event, isExpanded) => handleChange(isExpanded, `panel${index}`)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                    >
                        <Typography>{t(`medication.topic.${summary.summaryKey}`)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {summary.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div >
    );
}
```
#### Imagen de ejecución
![](https://i.imgur.com/7XUYC7Q.png)

<a name="item12"></a>
## patient-info-section
Esta carpeta contiene los archivos MedicationsPatientInfoSections, MedicationsPatientInfoSectionsForm y MedicationsSign.

#### MedicationsPatientInfoSections.tsx
En este archivo es el encargado de las llamadas del archivo MedicationsPatientInfoSectionsForm y validaciones con YUP  y declaraciones de tipos de datos y funcionamiento de los onclick de los button.

#### Code
```
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { MedicationsFormValues } from "../medicationsHelper";
import { SexOption } from "types/interfaces";
import MedicationsPatientInfoSectionForm from "./MedicationsPatientInfoSectionForm";

const sexOptions: SexOption[] = [
    {
        value: 'F',
        label: 'Femenino',
    },
    {
        value: 'M',
        label: 'Masculino',
    },
    {
        value: 'OT',
        label: 'Otro',
    },
];

const medicationsPatientInfoSchema = (t: (text: string) => string) => Yup.object().shape({
    patientInfo: Yup.object().shape({
        firstName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(5, (t("validation.messages.firstName"))),
        lastName: Yup.string().matches(/^[a-zA-Z ]*$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(5, (t("validation.messages.lastName"))),
        address: Yup.string().required(t("validation.messages.required")).min(20, (t("validation.messages.address"))),
        telephone: Yup.string().matches(/^[+0-9]+$/, (t("validation.messages.alfa"))).required(t("validation.messages.required")).min(10, (t("validation.messages.telephone"))),
        email: Yup.string().email((t("validation.messages.format"))).required(t("validation.messages.required")),
        dateBirth: Yup.date().min(new Date('1900-01-01')).required(t("validation.messages.required")),
        sexAssig: Yup.mixed().oneOf(sexOptions.map(sex => sex.value), (t('validation.messages.sexAssig'))).required(t("validation.messages.required")),
        agreeToConsent: Yup.boolean().oneOf([true], t("validation.messages.required")),
        sign: Yup.mixed().required(t("validation.messages.sign")),
    })
});

type MedicationsPatientInfoSectionProps = {
    data: MedicationsFormValues;
    onPrev: (data: MedicationsFormValues) => void;
    onEnd: (data: MedicationsFormValues) => void;
    onShowPreview: () => void;
}

const MedicationsPatientInfoSection = (props: MedicationsPatientInfoSectionProps) => {
    const { data, onPrev, onEnd, onShowPreview } = props;

    const { t } = useTranslation();

    return (
        <>
            <Formik
                initialValues={data}
                validationSchema={medicationsPatientInfoSchema(t)}
                onSubmit={(values) => {
                    onEnd(values);
                    onShowPreview();
                }}
            >
                {(props) => (
                    <MedicationsPatientInfoSectionForm {...props} sexOptions={sexOptions} onPrev={onPrev} />
                )}
            </Formik>
        </>
    )
}

export default MedicationsPatientInfoSection;
```

#### MedicationsPatientInfoSectionsForm.tsx
Este archivo es el encargado del formulario de pacientes, donde es obligatorio llenar todos los campos relacionados de paciente y aceptación de terminos y firma de aceptación.

#### Code
```
import { useTranslation } from 'next-i18next';
import { Field, Form as FormikForm, FormikProps } from "formik";
import { Grid, Button, MenuItem, TextField as MUITextField, FormHelperText, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FormTitle from '@src/ui/forms/FormTitle';
import FormHeader from '@src/ui/forms/FormHeader';
import FormConainter from '@src/ui/forms/FormConainter';
import FormInnerContainer from '@src/ui/forms/FormInnerContainer';
import MedicationsSign from './MedicationsSign';
import { TextField } from '@src/ui/forms/controls/TextField';
import { MedicationsFormValues } from '../medicationsHelper';
import { SexOption } from 'types/interfaces';
import { Checkbox } from '@src/ui/forms/controls/Checkbox';

type MedicationsPatientInfoSectionFormProps = FormikProps<MedicationsFormValues> & {
    sexOptions: SexOption[];
    onPrev: (data: MedicationsFormValues) => void;
};

export default function MedicationsPatientInfoSectionForm(props: MedicationsPatientInfoSectionFormProps) {
    const { values, setFieldValue, sexOptions, onPrev, errors, touched } = props;

    const { t } = useTranslation();

    return (
        <>
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('medication.patient.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {t('medication.patient.FirstName')}
                                <Field
                                    name="patientInfo.firstName"
                                    id="id"
                                    label={t('medication.patient.FirstName')}
                                    component={TextField}
                                    fullWidth
                                    required
                                    placeholder={t('medication.patient.FirstName')}
                                >
                                </Field>
                            </Grid>

                            <Grid item xs={6}>
                                {t('medication.patient.LastName')}
                                <Field
                                    name="patientInfo.lastName"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.LastName')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.LastName')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                {t('medication.patient.Address')}
                                <Field
                                    name="patientInfo.address"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Address')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.Address')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.Telephone')}
                                <Field
                                    name="patientInfo.telephone"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Telephone')}
                                    component={TextField}
                                    required
                                    placeholder={t('+000000000000')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.Email')}
                                <Field
                                    name="patientInfo.email"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.Email')}
                                    component={TextField}
                                    required
                                    placeholder={t('xxxxxxxx@xxxx.xxx')}
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.DateBirth')}
                                <Field
                                    name="patientInfo.dateBirth"
                                    fullWidth
                                    id="id"
                                    label={t('medication.patient.DateBirth')}
                                    component={TextField}
                                    required
                                    placeholder={t('0000-00-00')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {t('medication.patient.SexAssig')}
                                <Field
                                    name="patientInfo.sexAssig"
                                    fullWidth
                                    select
                                    id="id"
                                    label={t('medication.patient.SexAssig')}
                                    component={TextField}
                                    required
                                    placeholder={t('medication.patient.SexAssig')}
                                >
                                    {sexOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                    </FormInnerContainer>
                    <FormConainter>
                        <Box paddingX={2} marginTop={4}>
                            {t('medication.patient.consentSection')}

                            <MUITextField
                                variant='outlined'
                                name='agreeToTerms'
                                fullWidth
                                id="id"
                                required
                                multiline
                                type={'checkbox'}
                                value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            />

                            <Field
                                name="patientInfo.agreeToConsent"
                                label={t('medication.patient.Iagress')}
                                value={true}
                                component={Checkbox}
                            />

                            {(touched?.patientInfo?.agreeToConsent && errors?.patientInfo?.agreeToConsent) && <FormHelperText error>{errors.patientInfo.agreeToConsent}</FormHelperText>}
                        </Box>
                        <Box marginX={4} textAlign={'center'} color={'red'}>
                            {touched.patientInfo?.sign && errors.patientInfo?.sign && (
                                <div>{errors.patientInfo.sign}</div>
                            )}
                        </Box>
                        <MedicationsSign onChange={(sign) => setFieldValue('patientInfo.sign', sign)} />
                    </FormConainter>
                </FormConainter>
                <Button
                    startIcon={<KeyboardBackspaceIcon />}
                    variant="contained"
                    color='secondary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                    onClick={() => onPrev(values)}
                >
                    {t('medication.goback')}
                </Button>

                <Button
                    type="submit"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(2) })}
                >
                    {t('medication.form.actions.save')}
                </Button>
            </FormikForm >
        </>
    )
}


```
#### Imagen de ejecución
![](https://i.imgur.com/ZLvJEtn.png)

#### MedicationsSign.tsx
Este componente es el encargado de la firma digital del formulario de paciente de la App.

#### Code
```
import { useRef } from "react";
import { useTranslation } from "next-i18next";
import SignatureCanvas from 'react-signature-canvas'
import { Box, Button } from '@mui/material';

type MedicationSignProps = {
    onChange: (base64Image: string) => void
}

export default function MedicationsSign(props: MedicationSignProps) {
    const { onChange } = props;

    const { t } = useTranslation();

    const signRef = useRef<SignatureCanvas | null>(null);

    const handleClear = () => {
        signRef.current?.clear();
        onChange?.('');
    }
    const handleGenerate = () => {
        onChange?.(signRef.current?.getTrimmedCanvas().toDataURL('imagen/png') ?? '')
    }

    return (
        <>
            <Box style={{ textAlign: 'center' }}>
                <SignatureCanvas
                    canvasProps={{ width: 500, height: 200, style: { border: '1px solid black' } }}
                    ref={signRef}
                    penColor='black'
                    velocityFilterWeight={1}
                    dotSize={1}
                    onEnd={handleGenerate}
                />
            </Box>
            <Box style={{ textAlign: 'center' }}>
                <Button
                    color='error'
                    variant="contained"
                    onClick={handleClear}
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.firme.clear')}
                </Button>
            </Box>
        </>
    )
}
```
#### Imagen de ejecución
![](https://i.imgur.com/66sWdkp.png)

<a name="item13"></a>
#### welcome-section 
En esta carpeta se encarga de la información del doctor de la App.

#### MedicationsDoctorSection.tsx
En este archivo es el encargado de las llamadas del archivo MedicationsDoctorSectionForm y validaciones con YUP  y declaraciones de tipos de datos y funcionamiento de los onclick de los button.

#### Code
```
import { useTranslation } from "next-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { MedicationsFormValues } from "../medicationsHelper";
import { Doctors } from 'types/interfaces';
import { Insurance } from 'types/interfaces';
import MedicationsDoctorSectionForm from "./MedicationsDoctorSectionForm";

type MedicationsDoctorSectionProps = {
    data: MedicationsFormValues;
    onNext: (data: MedicationsFormValues) => void;
    doctors: Doctors[];
    insurance: Insurance[];
    onShowPreview: () => void;

}

const doctorSectionSchema = (t: (text: string) => string) => Yup.object().shape({
    doctorInfo: Yup.object().shape({
        doctorId: Yup.number().min(1, (t("validation.messages.required"))).required(t("validation.messages.required")),
        insuranceId: Yup.number().min(1, (t("validation.messages.required"))).required(t("validation.messages.required")),
    })
});

const MedicationsDoctorSection = (props: MedicationsDoctorSectionProps) => {
    const { data, onNext, doctors, insurance, onShowPreview } = props;

    const { t } = useTranslation();

    const onSubmit = async (values: MedicationsFormValues) => {
        onNext(values);
    };

    return (
        <Formik
            initialValues={data}
            onSubmit={onSubmit}
            validationSchema={doctorSectionSchema(t)}
            enableReinitialize
        >
            {(props) => (
                <MedicationsDoctorSectionForm {...props} onShowPreview={onShowPreview} doctors={doctors} insurance={insurance} onNext={onNext} />
            )}
        </Formik >
    )
}
export default MedicationsDoctorSection;
```

#### MedicationsDoctorSectionsForm.tsx
En este archivo podenos tener llos input para seleccionar el doctor y seguro en la App.

#### Code
```
import { Form as FormikForm, FormikProps, Field, FieldArray } from "formik";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import PreviewIcon from '@mui/icons-material/Preview';
import EastIcon from '@mui/icons-material/East';
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import { Button, MenuItem, Grid } from '@mui/material';
import { TextField } from "@src/ui/forms/controls/TextField";
import { useTranslation } from "next-i18next";
import { MedicationsFormValues } from "../medicationsHelper";
import { Doctors } from "types/interfaces";
import { Insurance } from "types/interfaces";

type MedicationsDoctorSectionFormProps = FormikProps<MedicationsFormValues> & {
    doctors: Doctors[];
    insurance: Insurance[];
    onNext: (data: MedicationsFormValues) => void;
    onShowPreview: () => void;
};

export default function MedicationsDoctorSectionForm(props: MedicationsDoctorSectionFormProps) {
    const { doctors, insurance, onShowPreview } = props;
    const { t } = useTranslation();

    return (
        <>
            <FormikForm noValidate autoComplete="false">
                <FormHeader>
                    <FormTitle variant="h6" color="inherit" noWrap>
                        {t('doctorSure.title')}
                    </FormTitle>
                </FormHeader>
                <FormConainter>
                    <FormInnerContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                {t('doctorSure.ConfirmYourDoctor')}
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    select
                                    id="doctorInfo.doctorId"
                                    name="doctorInfo.doctorId"
                                    label={t('doctorSure.ConfirmYourDoctor')}
                                    component={TextField}
                                    required
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {`${option.name} - ${option.specialty}`}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                {t('doctorSure.ConfirmYourInsurance')}
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    select
                                    id="doctorInfo.insuranceId"
                                    name="doctorInfo.insuranceId"
                                    label={t('doctorSure.ConfirmYourInsurance')}
                                    component={TextField}
                                    required
                                >
                                    {insurance.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                        </Grid>
                    </FormInnerContainer>
                </FormConainter>
                <Button
                    startIcon={<PreviewIcon />}
                    variant="outlined"
                    color='secondary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                    onClick={onShowPreview}
                >
                    {t('medication.form.actions.showPreview')}
                </Button>
                <Button
                    type="submit"
                    startIcon={<EastIcon />}
                    variant="contained"
                    color='primary'
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                >
                    {t('medication.next')}
                </Button>
            </FormikForm >
        </>
    )
}
```
#### Imagen de ejecución
![](https://i.imgur.com/NrXuKnM.png)

<a name="item14"></a>
#### Medication.tsx
Este archivo es la encargada de la llamada de las vista principales de medication de la App.

#### Code
```
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import useMedications from '@src/hooks/useMedications';
import useDoctors from '@src/hooks/useDoctors';
import MedicationsOutputSection from './output-section/MedicationsOutputSection';
import MedicationsMainSection from './main-section/MedicationsMainSection';
import { MedicationsFormValues, defaultValues } from './medicationsHelper';
import MedicationsPatientInfoSection from './patient-info-section/MedicationsPatientInfoSection';
import MedicationsPreviewDataDialog from './main-section/MedicationsPreviewDataDialog';
import MedicationsDoctorSection from './welcome-section/MedicationsDoctorSection';
import useInsurances from '@src/hooks/useInsurances';

export default function Medications() {
    const { t } = useTranslation();

    const { medications = [] } = useMedications();

    const { doctors = [] } = useDoctors();

    const { insurance = [] } = useInsurances();

    const [data, setData] = useState<MedicationsFormValues>(defaultValues);

    const [currentStep, setCurrentStep] = useState(0);

    const [showPreview, setShowPreview] = useState(false);

    const handlePrev = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));

        setCurrentStep(step => step - 1);
    }

    const handleNext = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));

        setCurrentStep(step => step + 1);
    }

    const handleEnd = (newData: MedicationsFormValues) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));
    }

    const handleShowPreview = () => {
        setShowPreview(true);
    }

    const handleHidePreview = () => {
        setShowPreview(false);
    }

    const steps = [

        <MedicationsDoctorSection
            data={data}
            doctors={doctors}
            insurance={insurance}
            onShowPreview={handleShowPreview}
            onNext={handleNext}
        />,
        <MedicationsMainSection
            onShowPreview={handleShowPreview}
            onNext={handleNext}
            onPrev={handlePrev}
            data={data}
            medications={medications}
        />,
        <MedicationsOutputSection
            onPrev={handlePrev}
            onNext={handleNext}
            data={data}
        />,
        <MedicationsPatientInfoSection
            onShowPreview={handleShowPreview}
            onPrev={handlePrev}
            onEnd={handleEnd}
            data={data}
        />
    ];

    return <>
        {steps[currentStep]}

        <MedicationsPreviewDataDialog
            showPreview={showPreview}
            onHidePreview={handleHidePreview}
            values={data}
        />
    </>
}

```
<a name="item15"></a>
#### MedicationsForm.tsx
Este archivo es el encargado del formulario de medicamentos de nuestro app.

#### Code
```
import { useTranslation } from "next-i18next";
import { Button, Grid, MenuItem } from '@mui/material';
import { Field, FieldArray, Form as FormikForm, FormikProps } from "formik";
import SaveIcon from '@mui/icons-material/Save';
import QueueIcon from '@mui/icons-material/Queue';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useConditionTreatments from "@src/hooks/useConditionTreatments";
import { TextField } from "@src/ui/forms/controls/TextField";
import useRelevantDiagnosis from "@src/hooks/useRelevantDiagnosis";
import { MedicationsFormValues } from "./medicationsHelper";
import { Medication } from "types/interfaces";
import FormHeader from "@src/ui/forms/FormHeader";
import FormTitle from "@src/ui/forms/FormTitle";
import FormInnerContainer from "@src/ui/forms/FormInnerContainer";
import FormConainter from "@src/ui/forms/FormConainter";
import theme from "@src/theme";
import FormFooter from "@src/ui/forms/FormFooter";

const MAX_NUMBER_OF_MEDICATIONS = 8;

type ConditionsTreatmentsSelectProps = {
    id: string;
    name: string;
    medicationId: number;
}

const ConditionsTreatmentsSelect = (props: ConditionsTreatmentsSelectProps) => {
    const { id, name, medicationId } = props;

    const { t } = useTranslation();

    const { conditionTreatments = [] } = useConditionTreatments({
        queryParams: {
            medicationId,
        }
    });

    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.conditionTreatment')}
            component={TextField}
            required
            disabled={!medicationId}
        >
            {conditionTreatments.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type RelevantDiagnosisSelectProps = {
    id: string;
    name: string;
    medicationId: number;
    conditionTreatmentId: number;
}

const RelevantDiagnosisSelect = (props: RelevantDiagnosisSelectProps) => {
    const { id, name, medicationId, conditionTreatmentId } = props;

    const { t } = useTranslation();

    const { relevantDiagnosis = [] } = useRelevantDiagnosis({
        queryParams: {
            medicationId,
            conditionTreatmentId,
        }
    });

    return (
        <Field
            fullWidth
            select
            id={id}
            name={name}
            label={t('medication.form.fields.diagnosis')}
            component={TextField}
            required
            disabled={!medicationId || !conditionTreatmentId}
        >
            {relevantDiagnosis.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {`${option.name} - ${option.description}`}
                </MenuItem>
            ))}
        </Field>
    )
}

type MedicationsFormProps = FormikProps<MedicationsFormValues> & {
    medications: Medication[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onShowPreview: () => void,
};

const MedicationsForm = (props: MedicationsFormProps) => {
    const { medications, values, onShowPreview } = props;
    const { t } = useTranslation();

    return (
        <FormikForm noValidate autoComplete="false">
            <FormHeader>
                <FormTitle variant="h6" color="inherit" noWrap>
                    {t('medication.title')}
                </FormTitle>
            </FormHeader>

            <FieldArray name='medications'>
                {({ push, remove }) => (
                    <>
                        {values.medications.map((_, index) => <FormConainter key={index} style={{ marginBottom: theme.spacing(3) }}>
                            <FormInnerContainer>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        {t('medication.name')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Field
                                            fullWidth
                                            select
                                            id={`medications-${index}-medicationId`}
                                            name={`medications.${index}.medicationId`}
                                            label={t('medication.form.fields.medicationName')}
                                            component={TextField}
                                            required
                                        >
                                            {medications.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {`${option.label}`}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.condition')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ConditionsTreatmentsSelect
                                            id={`medications-${index}-conditionTreatmentId`}
                                            name={`medications.${index}.conditionTreatmentId`}
                                            medicationId={values.medications[index].medicationId}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        {t('medication.diagnosis')}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <RelevantDiagnosisSelect
                                            id={`medications-${index}-diagnosisId`}
                                            name={`medications.${index}.diagnosisId`}
                                            medicationId={values.medications[index].medicationId}
                                            conditionTreatmentId={values.medications[index].conditionTreatmentId}
                                        />
                                    </Grid>
                                </Grid>
                            </FormInnerContainer>
                            <FormFooter>
                                <Button
                                    startIcon={<DeleteForeverIcon />}
                                    variant="contained"
                                    color='error'
                                    sx={(theme) => ({ margin: theme.spacing(1) })}
                                    onClick={() => remove(index)}
                                >
                                    {t('medication.form.actions.remove')}
                                </Button>
                            </FormFooter>
                        </FormConainter>)}

                        {values.medications.length < MAX_NUMBER_OF_MEDICATIONS && <Button
                            startIcon={<QueueIcon />}
                            variant="contained"
                            color='success'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={() => push({
                                medicationId: 0,
                                conditionTreatmentId: 0,
                                diagnosisId: 0,
                            })}
                        >
                            {t('medication.form.actions.add')}
                        </Button>
                        }
                        <Button
                            type="submit"
                            startIcon={<PreviewIcon />}
                            variant="contained"
                            color='secondary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                            onClick={onShowPreview}
                        >
                            {t('medication.form.actions.showPreview')}
                        </Button>
                        <Button
                            type="submit"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color='primary'
                            sx={(theme) => ({ margin: theme.spacing(1) })}
                        >
                            {t('medication.form.actions.save')}
                        </Button>
                    </>
                )}
            </FieldArray>
        </FormikForm>
    );
}

export default MedicationsForm;
```

<a name="item16"></a>
#### MedicationHelper.tsx
Este archivo es el encargado de la estructura de salida y tipos de datos que recibe cada parametro en nuestra App.

#### Code
```
import { ConditionTreatment, Medication, RelevantDiagnosis } from "types/interfaces";

export type MedicationsFormValues = {
	currentMedicationIndex: number,
	doctorInfo: {
		doctorId: number;
		insuranceId: number;
	},
	medications: {
		medicationId: number;
		conditionTreatmentId: number;
		diagnosisId: number;
	}[],
	medicationsFullInfo: {
		medication: Medication;
		conditionTreatment: ConditionTreatment;
		diagnosis: RelevantDiagnosis;
	}[],
	patientInfo: {
		firstName: string;
		lastName: string;
		address: string;
		telephone: string;
		email: string;
		dateBirth: string;
		sexAssig: string;
		sign: string;
		agreeToConsent: boolean;
	}
};

export const defaultValues: MedicationsFormValues = {
	currentMedicationIndex: 0,
	doctorInfo: {
		doctorId: 0,
		insuranceId: 0,
	},
	medications: [{
		medicationId: 0,
		conditionTreatmentId: 0,
		diagnosisId: 0,
	}],
	medicationsFullInfo: [],
	patientInfo: {
		firstName: '',
		lastName: '',
		address: '',
		telephone: '',
		email: '',
		dateBirth: '',
		sexAssig: '',
		sign: '',
		agreeToConsent: false,
	}
}
```
<a name="item17"></a>
## Settings
En esta carpeta se encuentra dos archivos settings.tsx y settingsHelper.tsx son archivos encargado de idiama de la App.

#### Settings.tsx
Este componente es el encargado  de la configuración del idioma de la App.

#### Code
```
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

```

#### SettingsHelper.tsx
Este componente es el encargado de exportación de idioma de la App.

#### Code
```
export type SettingsFormValues = {
	language: string;
};

export const defaultValues: SettingsFormValues = {
	language: 'en',
};

```
#### Imagen de ejecución
![](https://i.imgur.com/Ug83Tn6.png)
