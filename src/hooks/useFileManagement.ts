import useSWR from "swr";
import { FileManagementDate } from "types/interfaces";

const fetcher = (args: string) => fetch(args).then(res => res.json());

interface UseFileManagementsParams {
    queryParams?: {
        search?: number | string | null,
    },
}

export default function useFileManagement({ queryParams }: UseFileManagementsParams = {}) {
    const queryString = new URLSearchParams(queryParams as Record<string, any>);

    const url = `/api/testing/file-management?${queryString}`;

    const { data, error, isValidating } = useSWR<FileManagementDate[]>(url, fetcher);

    return {
        fileManagementDate: data,
        isError: !!error,
        isLoading: isValidating,
    }
}