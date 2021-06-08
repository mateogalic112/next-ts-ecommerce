import { indigo, pink } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo300 } from 'material-ui/styles/colors';

declare module '@material-ui/core/styles/createPalette' {
	interface Palette {
		neutral: Palette['primary'];
	}
	interface PaletteOptions {
		neutral: PaletteOptions['primary'];
	}
}

const theme = createMuiTheme({
	palette: {
		primary: indigo,
		secondary: pink,
		neutral: {
			main: '#FBF4EB',
		},
	},
});

export default theme;
