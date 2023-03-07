import { useEffect, useState } from "react";
import { getMedicationNames } from "../API/medicationNames";

const useMedicationNames = () => {
    const [medicationNames, setMedicationNames] = useState([]);

    useEffect(() => {
        getMedicationNames()
            .then(res => setMedicationNames(res));
    }, []);

    return {
        medicationNames
    };
}

export default useMedicationNames;