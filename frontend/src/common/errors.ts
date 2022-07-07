export const toMessage = (err: unknown): string => {
	const isObject = (obj: unknown): obj is Record<string, unknown> => typeof obj === 'object'
        && !Array.isArray(obj)
        && obj !== null;

	if (isObject(err)) {
		return `${err?.message}` || `${err?.cause}` || 'unknown error';
	}

	return JSON.stringify(err);
};
