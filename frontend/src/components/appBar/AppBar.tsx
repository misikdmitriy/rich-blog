import React, {
	useState, createContext, useCallback, useMemo, useContext,
} from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

type SnackbarCallback = ((message: string, severity?: AlertColor) => void);

interface SnackbarContextType {
    open: SnackbarCallback
}

const SnackbarContext = createContext<SnackbarContextType>({ open: () => {} });

interface AppBarProps {
    children: React.ReactNode | React.ReactNode[]
}

const AppBar = (props: AppBarProps) => {
	const { children } = props;

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string | undefined>(undefined);
	const [severity, setSeverity] = useState<AlertColor>('info');

	const openSnackbar = () => setSnackbarOpen(true);
	const closeSnackbar = () => setSnackbarOpen(false);

	const open: SnackbarCallback = useCallback((
		newMessage: string,
		newSeverity: AlertColor | undefined = 'info',
	) => {
		setSeverity(newSeverity);
		setMessage(newMessage);
		openSnackbar();
	}, [setSeverity, closeSnackbar]);

	const context = useMemo<SnackbarContextType>(() => ({ open }), [open]);

	return (
		<SnackbarContext.Provider value={context}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				autoHideDuration={6000}
				open={snackbarOpen}
				onClose={closeSnackbar}
			>
				<Alert onClose={closeSnackbar} severity={severity}>{message || ''}</Alert>
			</Snackbar>
			{children}
		</SnackbarContext.Provider>
	);
};

export const useAppBar = () => useContext(SnackbarContext);

export default AppBar;
