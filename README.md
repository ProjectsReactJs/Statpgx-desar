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
		* [OptionSelect.js](#item18)
* [hooks](#item19)
* [OptionSelect.js](#item)
* [pages](#item)
    * [Medication.js](#item)

<a name="item1"></a>
## assets
Está carpeta es la encargada de guardar las imagenes que se van a utilizar en la APP.

<a name="item2"></a>
## Components
Los componentes le permiten separar la interfaz de usuario en piezas independientes y reutilizables y pensar en cada pieza de forma aislada. Esta página proporciona una introducción a la idea de los componentes. Puede encontrar una API detallada sobre los componentes aquí.

<a name="item3"></a>
### button / Button.js
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
#### Dashboard / Dashboard.tsx
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

<a name="item5"></a>
### form / Select.js
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
<a name="item6"></a>
#### header / NavBar.js
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

<a name="item7"></a>
#### main / hooks
Esta carpeta main contiene los archivos AuthenticatedPage.tsx , MainContent.tsx , NavigationItemLink.tsx , NavigationItemWithSubItemsLink.tsx , NavigationList.tsx , Page.tsx  y una carpeta llamada hooks que contiene useNavigationOptions.tsx 

<a name="item7"></a>
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

<a name="item7"></a>
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

<a name="item7"></a>
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

<a name="item7"></a>
#### NavigationItemLink.tsx
This file is th
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

<a name="item7"></a>
#### NavigationItemWithSubItems.tsx
This file is th
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

<a name="item7"></a>
#### NavigationList.tsx
This file is th
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

<a name="item7"></a>
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

<a name="item8"></a>
#### Medication / main-section / output-section / patient-info-section / welcome-section 
Esta carpeta de medication contiene y sub carpeta que son main-section, output-section, patient-info-section, welcome-section y 3 archivos llamados Medications.tsx, MedicationsForm.tsx y medicationsHelper.ts

#### Code
```
import { Container, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import OptionSelect from "../components/OptionSelect";
import Button from "../components/button/Button";

const Item = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    fontStyle: 'normal',
    color: theme.palette.text.secondary,
    fontSize: 20,
    borderRadius: 1,
    border: 1,
    margin: 4,
}));

const Medication = () => {
    return (
        <Box>
            <Container>
                <Typography my={8} variant="h5" color={"grey"}>CURRENT AND PROSPECTIVE MEDICATIONS</Typography>
                <Paper>
                    <Grid container padding={2}>
                        <Grid item xs={5}  >
                            <Item>Name of Medication</Item>
                        </Grid>
                        <Grid item xs={7} >
                            <OptionSelect />
                        </Grid>
                        <Grid item xs={5} >
                            <Item>Condition you are treating with this medication</Item>
                        </Grid>
                        <Grid item xs={7}>
                            <OptionSelect />
                        </Grid>
                        <Grid item xs={5}>
                            <Item>Relevant Diagnosis</Item>
                        </Grid>
                        <Grid item xs={7}>
                            <OptionSelect />
                        </Grid>
                    </Grid>
                    <div style={{ textAlign: 'right' }}>
                        <Button color="error" children="Add medication" />
                    </div>
                </Paper>
                <Box py={2}>
                    <Button color="info" children="Submit" />
                </Box>
            </Container>
        </Box>
    );
}

export default Medication;
```

### Execution of the first epic of the first sprint
![](https://i.imgur.com/qFw7Hs4.png)
