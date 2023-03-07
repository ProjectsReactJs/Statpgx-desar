import { useEffect, useState } from "react";
import { getConditionTreatments } from "../API/conditionTreatments";

const useConditionTreatments = ({ medicationId } = {}) => {
    const [conditionTreatments, setConditionTreatments] = useState([]);

    useEffect(() => {
        getConditionTreatments({ medicationId })
            .then(res => setConditionTreatments(res));
    }, [medicationId]);

    return {
        conditionTreatments
    };
}

export default useConditionTreatments;