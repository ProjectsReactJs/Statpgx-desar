import useSWR from "swr";
import { RelevantDiagnosis } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

interface UseRelevantDiagnosisParams {
    queryParams?: {
        medicationId?: number | null,
        conditionTreatmentId?: number | null,
    },
}

export default function useRelevantDiagnosis({ queryParams }: UseRelevantDiagnosisParams = {}) {
    const queryString = new URLSearchParams(queryParams as Record<string, any>);

    const url = `/api/testing/condition-diagnoses?${queryString}`;

    const { data, error, isValidating } = useSWR<RelevantDiagnosis[]>(url, fetcher);

    return {
        relevantDiagnosis: data,
        isError: !!error,
        isLoading: isValidating,
    }
}