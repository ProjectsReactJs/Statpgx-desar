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