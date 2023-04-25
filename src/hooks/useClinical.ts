import useSWR from "swr";
import { Clinical } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function useClinicals() {
    const { data, error, isValidating } = useSWR<Clinical[]>('/api/testing/clinical-accounts', fetcher);

    return {
        clinicals: data,
        isError: !!error,
        isLoading: isValidating,
    }
}