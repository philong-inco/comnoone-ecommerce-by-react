import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import router from 'routes';

import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';


const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
         
            <RouterProvider router={router} />
          
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
