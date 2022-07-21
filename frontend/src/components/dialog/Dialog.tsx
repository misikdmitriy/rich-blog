import React, {
	useState, useCallback, createContext, useMemo, useContext,
} from 'react';

interface DialogContextType {
    isOpen: boolean,
    open: () => void
    close: () => void
}

const DialogContext = createContext<DialogContextType>({
	isOpen: false,
	open: () => {},
	close: () => {},
});

interface DialogProps {
    children: React.ReactNode | React.ReactNode[]
}

const Dialog = (props: DialogProps) => {
	const { children } = props;
	const [isOpen, setOpen] = useState(false);

	const open = useCallback(() => setOpen(true), [setOpen]);
	const close = useCallback(() => setOpen(false), [setOpen]);

	const context = useMemo<DialogContextType>(() => ({
		isOpen,
		open,
		close,
	}), [isOpen, open, close]);

	return (
		<DialogContext.Provider value={context}>
			{children}
		</DialogContext.Provider>
	);
};

export const useDialog = () => useContext(DialogContext);
export const DialogConsumer = DialogContext.Consumer;

export default Dialog;
