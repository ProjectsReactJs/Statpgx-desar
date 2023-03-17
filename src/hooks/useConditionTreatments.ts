import useSWR from "swr";
import { ConditionTreatment } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

interface UseConditionTreatmentsParams {
    queryParams?: {
        medicationId?: number | null,
    },
}

export default function useConditionTreatments({ queryParams }: UseConditionTreatmentsParams = {}) {
    const queryString = new URLSearchParams(queryParams as Record<string, any>);

    const url = `/api/testing/condition-treatments?${queryString}`;

    const { data, error, isValidating } = useSWR<ConditionTreatment[]>(url, fetcher);

    return {
        conditionTreatments: data,
        isError: !!error,
        isLoading: isValidating,
    }
}