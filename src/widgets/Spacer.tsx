import React from 'react';

type SpacerProps = {
	marginTop?: string | number;
	marginRight?: string | number;
};

const VerticalSpacer: React.FC<SpacerProps> = ({ marginTop = '3rem', marginRight = '0rem' }) => {
	return <div style={{ marginTop, marginRight }}></div>;
};

export default VerticalSpacer;
