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