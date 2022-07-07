import React, {
	useState, createContext, useCallback, useMemo, useContext,
} from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface BackdropProps {
    open: () => void,
    close: () => void
}

const BackdropContext = createContext<BackdropProps>({ open: () => {}, close: () => {} });

interface BackdropProgressProps {
    children: React.ReactNode | React.ReactNode[]
}

const BackdropProgress = (props: BackdropProgressProps) => {
	const { children } = props;

	const [backdropOpen, setOpen] = useState(false);

	const open = useCallback(() => setOpen(true), [setOpen]);
	const close = useCallback(() => setOpen(false), [setOpen]);

	const backdrop = useMemo<BackdropProps>(() => ({ open, close }), [open, close]);

	return (
		<BackdropContext.Provider value={backdrop}>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={backdropOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{children}
		</BackdropContext.Provider>
	);
};

export const useBackdrop = () => useContext(BackdropContext);

export default BackdropProgress;
