import useSWR from "swr";
import { Medication } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function useMedicationFind(id: number) {
    const url = `/api/testing/medications/${id}`;

    const { data, error, isValidating } = useSWR<Medication>(url, fetcher);

    return {
        medication: data,
        isError: !!error,
        isLoading: isValidating,
    }
}
