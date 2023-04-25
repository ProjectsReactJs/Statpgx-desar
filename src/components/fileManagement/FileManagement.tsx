import { useState } from 'react';
import { ChangeEvent } from "react";
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import useFileManagement from '@src/hooks/useFileManagement';
import { FileManagementDate } from 'types/interfaces';
import FormHeader from '@src/ui/forms/FormHeader';
import FormTitle from '@src/ui/forms/FormTitle';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#f1f1f1',
        '&:hover': {
            backgroundColor: '#e1e1e1',
        },
    },
}));

type FileManagementProps = {
    fileManagements: FileManagementDate[];
}

type TranslatedColDef = (t: (text: string) => string) => GridColDef[]

const columns: TranslatedColDef = (t) => [
    { field: 'patientId', headerName: (t("fileManagement.patientId")), width: 120, headerClassName: 'table-color', align: 'center' },
    { field: 'date', headerName: (t("fileManagement.date")), valueFormatter: (params) => format(new Date(params.value), "dd-MM-yyyy"), width: 180, headerClassName: 'table-color', align: 'center' },
    { field: 'status', headerName: (t("fileManagement.status")), width: 100, headerClassName: 'table-color', align: 'center' },
    { field: 'patientName', headerName: (t("fileManagement.patientName")), width: 100, headerClassName: 'table-color', align: 'center' },
    { field: 'doctorName', headerName: (t("fileManagement.doctorName")), width: 250, headerClassName: 'table-color', align: 'center' },
    { field: 'representative', headerName: (t("fileManagement.representative")), width: 200, headerClassName: 'table-color', align: 'center' },
    { field: 'repUserName', headerName: (t("fileManagement.repUserName")), width: 200, headerClassName: 'table-color', align: 'center' },
    { field: 'insurance', headerName: (t("fileManagement.insurance")), width: 100, headerClassName: 'table-color', align: 'center' },
    {
        field: 'requisitionForm', renderCell: (params) => (
            <a href={params.value} target='_blank' rel='noreferer'><PdfIcon color='error' /></a>
        ), headerName: (t("fileManagement.requisitionForm")), width: 100, headerClassName: 'table-color', align: 'center'
    },
    {
        field: 'supportingDocument', renderCell: (params) => (
            <a href={params.value} target='_blank' rel='noreferer'><PdfIcon color='error' /></a>
        ), headerName: (t("fileManagement.supportingDocument")), width: 100, headerClassName: 'table-color', align: 'center'
    },
    {
        field: 'insuranceCard', renderCell: (params) => (
            <a href={params.value} target='_blank' rel='noreferer'><ImageIcon color='primary' /></a>
        ), headerName: (t("fileManagement.insuranceCard")), width: 120, headerClassName: 'table-color', align: 'center'
    },
    {
        field: 'checklist', renderCell: (params) => (
            <a href={params.value} target='_blank' rel='noreferer'><PdfIcon color='error' /></a>
        ), headerName: (t("fileManagement.checklist")), width: 80, headerClassName: 'table-color', align: 'center'
    },
    { field: 'testType', headerName: (t("fileManagement.testType")), width: 150, headerClassName: 'table-color', align: 'center' },
    { field: 'requisitionId', headerName: (t("fileManagement.requisitionId")), width: 120, headerClassName: 'table-color', align: 'center' },
    { field: 'testHistoryId', headerName: (t("fileManagement.testHistoryId")), width: 120, headerClassName: 'table-color', align: 'center' }
];

export const FileManagement = (props: FileManagementProps) => {
    const [searchValue, setSearchValue] = useState('');

    const { fileManagementDate = [] } = useFileManagement({
        queryParams: {
            search: searchValue,
        }
    });

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const { t } = useTranslation();

    const classes = useStyles();

    return (
        <>
            <FormHeader>
                <FormTitle variant="h6" color="inherit" noWrap>
                    {t('sidebar.navigationItems.fileManagement')}
                </FormTitle>
            </FormHeader>
            <div style={{ textAlign: 'right' }}>
                <TextField
                    id="busqueda"
                    sx={(theme) => ({ margin: theme.spacing(1), width: 600, backgroundColor: 'white' })}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end"  >
                                <IconButton className={classes.button} >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    placeholder={t('fileManagement.search')}
                    onChange={handleSearchChange}
                    value={searchValue}

                />
            </div>
            <Box style={{ height: 600, width: '100%', backgroundColor: 'white' }} className="table-centered-hedings">
                <DataGrid
                    rows={fileManagementDate}
                    columns={columns(t)}
                    pageSize={9}
                    rowsPerPageOptions={[10]}
                />
            </Box>
        </>
    )
}
