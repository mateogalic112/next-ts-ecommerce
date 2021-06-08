import React from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/globals.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>E-commerce - App</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};

export default MyApp;
