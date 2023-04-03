import useSWR from "swr";
import { Insurance } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function useInsurances() {
    const { data, error, isValidating } = useSWR<Insurance[]>('/api/testing/insurance', fetcher);

    return {
        insurance: data,
        isError: !!error,
        isLoading: isValidating,
    }
}