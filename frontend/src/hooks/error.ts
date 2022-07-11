import { useEffect } from 'react';
import { toMessage } from '../common/errors';
import { useAppBar } from '../components/appBar/AppBar';

export const useError = (
	errors: unknown[],
	customMessage: (msg: string) => string = (msg) => msg,
): void => {
	const { open: openSnackbar } = useAppBar();

	errors.forEach((error) => {
		useEffect(() => {
			if (error) {
				openSnackbar(customMessage(toMessage(error)), 'error');
			}
		}, [error]);
	});
};
