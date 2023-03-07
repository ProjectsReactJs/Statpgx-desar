import { Container, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from "../components/button/Button";
import useConditionTreatments from "../hooks/useConditionTreatments";
import useMedicationNames from "../hooks/useMedicationNames";
import useRelevantDiagnosis from "../hooks/useRelevantDiagnosis";
import Select from "../components/form/Select";
import { useEffect, useState } from "react";
import NavBar from "../components/header/NavBar";

const Item = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    fontStyle: 'normal',
    color: theme.palette.text.secondary,
    fontSize: 20,
    borderRadius: 1,
    border: 1,
    margin: 4,
}));

const defaultData = (extraData = {}) => ({
    medicationId: '',
    conditionTreatmentId: '',
    relevantDiagnosisId: '',
    ...extraData
})

const Medication = () => {
    const [data, setData] = useState(defaultData());

    const { medicationNames } = useMedicationNames();
    const { conditionTreatments } = useConditionTreatments({ medicationId: data.medicationId });
    const { relevantDiagnosis } = useRelevantDiagnosis({ medicationId: data.medicationId, conditionTreatmentId: data.conditionTreatmentId });

    useEffect(() => {
        setData(defaultData({ medicationId: data.medicationId }))
    }, [data.medicationId])


    const handleChange = (e) => {
        setData(data => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <Box>
            <NavBar />
            <Container>
                <Typography my={8} variant="h5" color={"grey"}>CURRENT AND PROSPECTIVE MEDICATIONS</Typography>
                <Paper>
                    <Grid container padding={2}>
                        <Grid item xs={5}  >
                            <Item>Name of Medication</Item>
                        </Grid>
                        <Grid item xs={7} >
                            <Select
                                items={medicationNames}
                                name={'medicationId'}
                                value={data.medicationId}
                                onChange={handleChange}
                                textExtractor={item => item.label}
                                keyExtractor={item => item.value}
                            />
                        </Grid>
                        <Grid item xs={5} >
                            <Item>Condition you are treating with this medication</Item>
                        </Grid>
                        <Grid item xs={7}>
                            <Select
                                items={conditionTreatments}
                                name={'conditionTreatmentId'}
                                disabled={!data.medicationId}
                                value={data.conditionTreatmentId}
                                onChange={handleChange}
                                textExtractor={item => `${item.name} - ${item.description}`}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Item>Relevant Diagnosis</Item>
                        </Grid>
                        <Grid item xs={7}>
                            <Select
                                items={relevantDiagnosis}
                                name={'relevantDiagnosisId'}
                                disabled={!data.medicationId || !data.conditionTreatmentId}
                                value={data.relevantDiagnosisId}
                                onChange={handleChange}
                                textExtractor={item => `${item.name} - ${item.description}`}
                                keyExtracto={item => item.id}
                            />
                        </Grid>
                    </Grid>
                    <Box padding={2} textAlign={"right"}>
                        <Button color="error" children="Add medication" />
                    </Box>
                </Paper>
                <Box py={2}>
                    <Button color="info" children="Submit" />
                </Box>
            </Container>
        </Box>
    );
}

export default Medication;