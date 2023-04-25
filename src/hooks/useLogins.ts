import useSWR from "swr";
import { User } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

export default function userLogins() {
    const { data, error, isValidating } = useSWR<User[]>('/api/testing/login', fetcher);

    return {
        users: data,
        isError: !!error,
        isLoading: isValidating,
    }
}