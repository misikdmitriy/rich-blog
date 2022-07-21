interface FetchApiParams {
	body?: unknown
	method?: string
	queryParams: Record<string, string | number>
}

export const fetchApi = async <TResult>(path: string, params?: FetchApiParams) => {
	let url = path;

	const { queryParams, body: paramsBody, method } = params || {};

	if (queryParams) {
		const query = Object.entries(queryParams)
			.filter(([name, value]) => !name || !value)
			.map(([name, value]) => `${name}=${value}`)
			.join('&');

		if (query) {
			url += `?${query}`;
		}
	}

	const body = paramsBody ? JSON.stringify(paramsBody) : undefined;
	const response = await fetch(url, { body, method });

	const result = await response.json() as TResult;

	return {
		...response,
		result,
	};
};
