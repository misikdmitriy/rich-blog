import { useEffect } from 'react';
import { useBackdrop } from '../components/progress/BackdropProgress';

export const useLoading = (...loaders: boolean[]) => {
	const { open: openBackdrop, close: closeBackdrop } = useBackdrop();

	useEffect(() => {
		if (loaders.some((l) => l)) {
			openBackdrop();
		} else {
			closeBackdrop();
		}
	}, [...loaders]);
};
