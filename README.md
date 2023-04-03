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

<a name="item2"></a>
### button 
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
#### Dashboard/ Dashboard.tsx
Component in charge of the input of the medication view, it was used for the UI material development.

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
### pages
---
It contains all the views created by the APP.

<a name="item6"></a>
#### Medication.js
This file is the layout of the drug view. It does not receive a parameter at the moment.

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
