import { useEffect, useState } from "react";
import { getRelevantDiagnosis } from "../API/relevantDiagnosis";

const useRelevantDiagnosis = ({ medicationId, conditionTreatmentId }) => {
    const [relevantDiagnosis, setRelevantDiagnosis] = useState([]);

    useEffect(() => {
        getRelevantDiagnosis({ medicationId, conditionTreatmentId })
            .then(res => setRelevantDiagnosis(res));
    }, [medicationId, conditionTreatmentId]);

    return {
        relevantDiagnosis
    };
}

export default useRelevantDiagnosis;