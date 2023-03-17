import useSWR, { Key, Fetcher } from 'swr';

export type FetcherRequest = {
	url: string;
	init: RequestInit;
	token: unknown;
};

export const fetcher = async (request: FetcherRequest) => {
	const { url, init, token } = request;
	const { headers, ...otherInitProps } = init;
	const res = await fetch(url, {
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': `${process.env.FROGMD_API_URL}`,
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			...headers,
		}),
		...otherInitProps,
	});

	return res.status === 204 ? 'NoContent' : res.json();
};
