import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
	title?: string;
	keywords?: string;
	description?: string;
}

const Layout: React.FC<LayoutProps> = ({ title, keywords, description, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<div style={{ flexGrow: 1 }}>{children}</div>
			<Footer />
		</>
	);
};

const defaultProps: LayoutProps = {
	title: 'Ecommerce',
	description: 'Playground for Next.js and Typescript',
	keywords: 'next, javascript, typescript, learning, development',
};

Layout.defaultProps = defaultProps;

export default Layout;
