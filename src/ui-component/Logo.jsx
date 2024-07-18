// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * 
 *
 */
import logocomno1 from 'assets/images/logocomno1.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={logocomno1} alt="Berry" width="170" />
    
  );
};

export default Logo;
