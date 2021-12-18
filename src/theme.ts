import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#640E27',
            dark: '#7e1735ed',
            contrastText: '#F7F3D0',
        },
        info: {
            light: '#EAFCF7',
            main: '#EAFCF7',
            dark: '#007254',
            contrastText: '#535353',
        },
        secondary: {
            main: 'rgba(63, 81, 181, 0.08);'
        }
    },
    typography:{
        fontFamily:"'SF Compact Display','SF Pro Display'"
    }
});

export default theme;