import useSWR from "swr";
import { Doctors } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function useDoctors() {
    const { data, error, isValidating } = useSWR<Doctors[]>('/api/testing/doctors', fetcher);

    return {
        doctors: data,
        isError: !!error,
        isLoading: isValidating,
    }
}