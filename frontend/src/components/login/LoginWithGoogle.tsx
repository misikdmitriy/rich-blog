import React from 'react';
import '../../styles/login/styles.scss';
import googleLogo from '../../assets/img/google.svg';

const LoginWithGoogle = () => {
	const onClick = async () => {
		const returnTo = window.location.href;
		window.location.href = `/api/v1/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
	};

	return (
		<div
			role="button"
			tabIndex={0}
			className="google-btn"
			onClick={onClick}
			onKeyPress={onClick}
		>
			<div className="google-icon-wrapper">
				<img
					alt="login with google"
					className="google-icon"
					src={googleLogo}
				/>
			</div>
			<p className="btn-text">
				<b>Sign in with Google</b>
			</p>
		</div>
	);
};

export default LoginWithGoogle;
