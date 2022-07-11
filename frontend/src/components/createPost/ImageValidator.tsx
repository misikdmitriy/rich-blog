import React, { useEffect, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, CircularProgress, Tooltip } from '@mui/material';

interface ImageValidatorProps {
    image?: string
}

type ValidationStatus = 'ABSENT' | 'NOTVALID' | 'VALIDATING' | 'VALID';

const ImageValidator = (props: ImageValidatorProps) => {
	const { image = '' } = props;
	const [validation, setValidation] = useState<ValidationStatus>('ABSENT');

	useEffect(() => {
		if (!image) {
			setValidation('ABSENT');
		} else {
			if (!image.startsWith('https:')) {
				setValidation('NOTVALID');
				return;
			}

			setValidation('VALIDATING');

			fetch(image)
				.then((response) => {
					if (response.ok) {
						setValidation('VALID');
					} else {
						setValidation('NOTVALID');
					}
				})
				.catch(() => {
					setValidation('NOTVALID');
				});
		}
	}, [image]);

	const renderIcon = () => {
		switch (validation) {
		case 'ABSENT':
			return <WarningAmberIcon color="warning" />;
		case 'NOTVALID':
			return <ErrorOutlineIcon color="error" />;
		case 'VALIDATING':
			return <CircularProgress size={24} />;
		case 'VALID':
			return <CheckCircleOutlineIcon color="success" />;
		default:
			throw new Error('unknown status');
		}
	};

	const toTooltip = () => {
		switch (validation) {
		case 'ABSENT':
			return 'Provide image';
		case 'NOTVALID':
			return 'Image is not valid';
		case 'VALIDATING':
			return 'Image validation in progress';
		case 'VALID':
			return 'Image valid';
		default:
			throw new Error('unknown status');
		}
	};

	return (
		<Tooltip title={toTooltip()}>
			<Box sx={{ m: 4, display: 'flex' }} alignItems="center">
				{renderIcon()}
			</Box>
		</Tooltip>
	);
};

ImageValidator.defaultProps = {
	image: '',
};

export default ImageValidator;
