import useSWR from "swr";
import { Medication } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function useMedications() {
    const { data, error, isValidating } = useSWR<Medication[]>('/api/testing/medications', fetcher);

    return {
        medications: data,
        isError: !!error,
        isLoading: isValidating,
    }
}